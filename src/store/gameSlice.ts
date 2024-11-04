import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerState, Item } from '../types/game';

const initialState: PlayerState = {
  level: 1,
  experience: 0,
  beliefs: [],
  completedChapters: [],
  achievements: [],
  inventory: [],
  currentLocation: 'Forest Hovel',
  diaryEntries: [
    {
      text: 'The world is dark and empty...',
      type: 'normal',
      timestamp: Date.now()
    }
  ],
  resources: {
    Land: 3,
    Wood: 2,
    Clay: 1,
    Flint: 1
  },
  actionCooldowns: {}
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
    },
    addToInventory(state, action: PayloadAction<Item>) {
      state.inventory.push(action.payload);
    },
    resetGame() {
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
    },
    addDiaryEntry(state, action: PayloadAction<{
      text: string;
      type: 'normal' | 'warning' | 'discovery';
    }>) {
      state.diaryEntries.push({
        text: action.payload.text,
        type: action.payload.type,
        timestamp: Date.now()
      });
    },
    updateLocation(state, action: PayloadAction<string>) {
      state.currentLocation = action.payload;
    },
    updateResources(state, action: PayloadAction<{
      resource: string;
      amount: number;
    }>) {
      const { resource, amount } = action.payload;
      state.resources[resource] = (state.resources[resource] || 0) + amount;
    },
    setActionCooldown(state, action: PayloadAction<{
      action: string;
      cooldown: number;
    }>) {
      state.actionCooldowns[action.payload.action] = Date.now() + action.payload.cooldown;
    }
  }
});

export const {
  completeChapter,
  updatePlayerStats,
  addToInventory,
  resetGame,
  updateBelief,
  addDiaryEntry,
  updateLocation,
  updateResources,
  setActionCooldown
} = gameSlice.actions;

export default gameSlice.reducer;