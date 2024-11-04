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
  inventory: Item[];
  currentLocation: string;
  diaryEntries: DiaryEntry[];
  resources: Record<string, number>;
  lastAction?: string;
  actionCooldowns: Record<string, number>;
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
  value: number;
  quantity: number;
  type: string;
  effects?: StatusEffect[];
  rarity: string;
}

export interface Inventory {
  items: Item[];
  capacity: number;
}

export interface Character {
  id: string;
  name: string;
  level: number;
  description: string;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  attack: number;
  defense: number;
  wisdom: number;
  strength: number;
  skills: Skill[];
  status: StatusEffect[];
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
    hp?: number;
    mp?: number;
    // 添加其他可能的效果...
  };
  type?: 'buff' | 'debuff' | 'healing' | 'damage';  // 添加效果类型
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

export interface Enemy {
  id: string;
  name: string;
  description: string;
  philosophy: string;
  level: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  attack: number;
  defense: number;
  wisdom: number;
  strength: number;
  skills: Skill[];
  status: any[]; // Consider defining a proper Status type
  reward: {
    experience: number;
    items?: Item[];
    wisdom?: number;
    strength?: number;
  };
  critRate: number;
  critDamage: number;
}

export interface EquipmentState {
  weapon?: Item;
  armor?: Item;
  accessory?: Item;
}

export interface DiaryEntry {
  text: string;
  type: 'normal' | 'warning' | 'discovery';
  timestamp: number;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  availableActions: string[];
  resources: Record<string, number>;
}

export interface GameAction {
  id: string;
  label: string;
  description: string;
  requirements?: {
    resources?: Record<string, number>;
    level?: number;
  };
  rewards?: {
    resources?: Record<string, number>;
    experience?: number;
  };
}