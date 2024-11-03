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

export interface PhilosophicalChallenge {
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