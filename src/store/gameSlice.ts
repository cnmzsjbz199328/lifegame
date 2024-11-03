import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerState, PhilosophicalBelief } from '../types/game';
import { loadGame, saveGame } from '../services/saveSystem';
import { achievements } from '../data/achievements';

const savedState = loadGame();

const initialState: PlayerState = savedState || {
  level: 1,
  experience: 0,
  beliefs: [],
  completedChapters: [],
  achievements: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateBelief(state, action: PayloadAction<PhilosophicalBelief>) {
      const index = state.beliefs.findIndex(b => b.id === action.payload.id);
      if (index >= 0) {
        state.beliefs[index] = action.payload;
      } else {
        state.beliefs.push(action.payload);
      }
      checkAchievements(state);
      saveGame(state);
    },
    completeChapter(state, action: PayloadAction<string>) {
      if (!state.completedChapters.includes(action.payload)) {
        state.completedChapters.push(action.payload);
        state.experience += 100;
        if (state.experience >= state.level * 1000) {
          state.level += 1;
          state.experience = 0;
        }
        checkAchievements(state);
        saveGame(state);
      }
    },
    unlockAchievement(state, action: PayloadAction<string>) {
      if (!state.achievements.includes(action.payload)) {
        state.achievements.push(action.payload);
        saveGame(state);
      }
    },
    resetGame(state) {
      state.level = 1;
      state.experience = 0;
      state.beliefs = [];
      state.completedChapters = [];
      state.achievements = [];
      saveGame(state);
    },
  },
});

// Helper function to check and unlock achievements
const checkAchievements = (state: PlayerState) => {
  achievements.forEach(achievement => {
    if (!state.achievements.includes(achievement.id) && achievement.condition(state)) {
      state.achievements.push(achievement.id);
    }
  });
};

export const { updateBelief, completeChapter, unlockAchievement, resetGame } = gameSlice.actions;
export default gameSlice.reducer;