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
  type: 'weapon' | 'consumable' | 'equipment' | 'quest';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  stackable: boolean;
  quantity?: number;
  effects?: {
    hp?: number;
    mp?: number;
    wisdom?: number;
    strength?: number;
    critRate?: number;
    critDamage?: number;
    attack?: number;
    defense?: number;
  };
  equipSlot?: 'weapon' | 'armor' | 'accessory';
}

export interface Inventory {
  items: Item[];
  capacity: number;
}

export interface Character {
  id: string;
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  wisdom: number;
  strength: number;
  skills: Skill[];
  status: StatusEffect[];
  mp: number;
  maxMp: number;
  critRate: number;
  critDamage: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  damage?: number;
  healing?: number;
  cost: number;
  type: 'physical' | 'magical' | 'healing' | 'buff' | 'debuff';
  effects?: StatusEffect[];
}

export interface StatusEffect {
  id: string;
  name: string;
  duration: number;
  effect: {
    attack?: number;
    defense?: number;
    wisdom?: number;
    strength?: number;
  };
}

export interface BattleState {
  player: Character;
  enemy: Character;
  turn: 'player' | 'enemy';
  log: string[];
  isOver: boolean;
}

export interface BattleReward {
  experience: number;
  items?: Item[];
  wisdom?: number;
  strength?: number;
}

export interface Enemy extends Character {
  reward: BattleReward;
  description: string;
  philosophy: string;
}

export interface EquipmentState {
  weapon?: Item;
  armor?: Item;
  accessory?: Item;
}