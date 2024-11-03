import { PhilosophicalChallenge } from '../types/game';

export const philosophicalChallenges: PhilosophicalChallenge[] = [
  {
    id: "eternal-return",
    concept: "永恒轮回",
    question: "如果生命将永恒重复，你会如何选择？",
    choices: [
      {
        id: "embrace",
        text: "欣然接受这个命运，视之为最高的肯定",
        impact: { belief: "eternal-return", strength: 10, understanding: 8 }
      },
      {
        id: "reject",
        text: "拒绝这个想法，寻求改变的可能",
        impact: { belief: "eternal-return", strength: -5, understanding: 5 }
      }
    ]
  },
  {
    id: "will-to-power",
    concept: "权力意志",
    question: "面对困境时，你会选择什么态度？",
    choices: [
      {
        id: "overcome",
        text: "克服困难，追求成长和超越",
        impact: { belief: "will-to-power", strength: 8, understanding: 10 }
      },
      {
        id: "accept",
        text: "接受现状，保持平和",
        impact: { belief: "will-to-power", strength: 3, understanding: 5 }
      }
    ]
  }
];