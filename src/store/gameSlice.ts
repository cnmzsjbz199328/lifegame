import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerState, PhilosophicalBelief } from '../types/game';

interface PlayerStatsUpdate {
  experience: number;
  wisdom: number;
  strength: number;
}

interface BeliefUpdate {
  id: string;
  strength: number;
  understanding: number;
}

const initialState: PlayerState = {
  level: 1,
  experience: 0,
  beliefs: [],
  completedChapters: [],
  achievements: []
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    completeChapter: (state, action: PayloadAction<string>) => {
      if (!state.completedChapters.includes(action.payload)) {
        state.completedChapters.push(action.payload);
      }
    },
    resetGame: () => initialState,
    updatePlayerStats: (state, action: PayloadAction<PlayerStatsUpdate>) => {
      state.experience += action.payload.experience;
      // 可以添加升级逻辑
      if (state.experience >= 1000) {
        state.level += 1;
        state.experience -= 1000;
      }
    },
    updateBelief: (state, action: PayloadAction<BeliefUpdate>) => {
      const belief = state.beliefs.find(b => b.id === action.payload.id);
      if (belief) {
        belief.strength += action.payload.strength;
        belief.understanding += action.payload.understanding;
      } else {
        state.beliefs.push({
          id: action.payload.id,
          concept: action.payload.id,
          strength: action.payload.strength,
          understanding: action.payload.understanding
        });
      }
    }
  }
});

export const { completeChapter, resetGame, updatePlayerStats, updateBelief } = gameSlice.actions;
export default gameSlice.reducer;