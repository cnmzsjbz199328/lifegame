export interface PhilosophicalBelief {
  id: string;
  concept: string;
  strength: number;
  understanding: number;
}

export interface PlayerState {
  level: number;
  experience: number;
  beliefs: PhilosophicalBelief[];
  completedChapters: string[];
  achievements: string[];
}

export interface DialogueChoice {
  id: string;
  text: string;
  impact: {
    belief: string;
    strength: number;
    understanding: number;
  };
}

export interface PhilosophicalChallengeType {
  id: string;
  concept: string;
  question: string;
  choices: DialogueChoice[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (state: PlayerState) => boolean;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: 'consumable' | 'equipment' | 'quest';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  stackable: boolean;
  quantity?: number;
  effects?: {
    wisdom?: number;
    strength?: number;
    // 其他可能的效果...
  };
}

export interface Inventory {
  items: Item[];
  capacity: number;
}