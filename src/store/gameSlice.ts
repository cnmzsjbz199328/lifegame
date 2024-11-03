import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerState, Item, PhilosophicalBelief } from '../types/game';

const initialState: PlayerState = {
  level: 1,
  experience: 0,
  beliefs: [],
  completedChapters: [],
  achievements: [],
  inventory: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    completeChapter(state, action: PayloadAction<string>) {
      if (!state.completedChapters.includes(action.payload)) {
        state.completedChapters.push(action.payload);
      }
    },
    updatePlayerStats(state, action: PayloadAction<{
      experience?: number;
      wisdom?: number;
      strength?: number;
    }>) {
      if (action.payload.experience) {
        state.experience += action.payload.experience;
      }
      // 其他状态更新...
    },
    addToInventory(state, action: PayloadAction<Item>) {
      state.inventory.push(action.payload);
    },
    resetGame(state) {
      return initialState;
    },
    updateBelief(state, action: PayloadAction<{
      id: string;
      strength?: number;
      understanding?: number;
    }>) {
      const belief = state.beliefs.find(b => b.id === action.payload.id);
      if (belief) {
        if (action.payload.strength !== undefined) {
          belief.strength += action.payload.strength;
        }
        if (action.payload.understanding !== undefined) {
          belief.understanding += action.payload.understanding;
        }
      } else {
        state.beliefs.push({
          id: action.payload.id,
          concept: action.payload.id,
          strength: action.payload.strength || 0,
          understanding: action.payload.understanding || 0
        });
      }
    }
  }
});

export const { completeChapter, updatePlayerStats, addToInventory, resetGame, updateBelief } = gameSlice.actions;
export default gameSlice.reducer;