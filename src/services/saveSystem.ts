import { PlayerState } from '../types/game';

const SAVE_KEY = 'life-of-battle-save';

export const saveGame = (state: PlayerState): void => {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save game:', error);
  }
};

export const loadGame = (): PlayerState | null => {
  try {
    const savedState = localStorage.getItem(SAVE_KEY);
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
};