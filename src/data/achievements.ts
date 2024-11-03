import { Achievement, PlayerState } from '../types/game';

export const achievements: Achievement[] = [
  {
    id: 'first-choice',
    title: '初次抉择',
    description: '完成第一个哲学选择',
    icon: '🎯',
    condition: (state: PlayerState) => state.completedChapters.length >= 1
  },
  {
    id: 'philosopher',
    title: '哲学家',
    description: '完成所有哲学挑战',
    icon: '🎓',
    condition: (state: PlayerState) => state.completedChapters.length >= 4
  },
  {
    id: 'master-of-wisdom',
    title: '智慧大师',
    description: '任意信念理解度达到10点',
    icon: '📚',
    condition: (state: PlayerState) => 
      state.beliefs.some(belief => belief.understanding >= 10)
  },
  {
    id: 'strong-believer',
    title: '坚定信念',
    description: '任意信念强度达到10点',
    icon: '💪',
    condition: (state: PlayerState) => 
      state.beliefs.some(belief => belief.strength >= 10)
  },
  {
    id: 'level-master',
    title: '等级大师',
    description: '达到2级',
    icon: '⭐',
    condition: (state: PlayerState) => state.level >= 2
  }
];