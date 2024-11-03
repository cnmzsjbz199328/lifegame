import { Enemy, Skill } from '../types/game';
import { items } from './items';

export const basicSkills: Skill[] = [
  {
    id: 'attack',
    name: '普通攻击',
    description: '基础攻击',
    damage: 10,
    cost: 0,
    type: 'physical'
  },
  {
    id: 'wisdom_strike',
    name: '智慧打击',
    description: '运用智慧造成伤害',
    damage: 15,
    cost: 10,
    type: 'magical'
  },
  {
    id: 'meditate',
    name: '冥想',
    description: '恢复生命值',
    healing: 20,
    cost: 15,
    type: 'healing'
  }
];

export const philosophicalSkills: Skill[] = [
  {
    id: 'dialectic',
    name: '辩证法',
    description: '运用辩证思维造成伤害',
    damage: 20,
    cost: 15,
    type: 'magical'
  },
  {
    id: 'categorical_imperative',
    name: '绝对命令',
    description: '康德式的道德审判',
    damage: 25,
    cost: 20,
    type: 'magical'
  },
  {
    id: 'existential_crisis',
    name: '存在危机',
    description: '引发对手的存在焦虑',
    damage: 18,
    cost: 12,
    type: 'debuff',
    effects: [{
      id: 'anxiety',
      name: '焦虑',
      duration: 3,
      effect: {
        attack: -5,
        defense: -3
      }
    }]
  }
];

export const enemies: Enemy[] = [
  {
    id: 'sophist',
    name: '诡辩者',
    description: '擅长诡辩的智者',
    philosophy: '相对主义',
    level: 1,
    hp: 100,
    maxHp: 100,
    attack: 10,
    defense: 5,
    wisdom: 8,
    strength: 5,
    skills: [basicSkills[0], basicSkills[1]],
    status: [],
    reward: {
      experience: 100,
      items: [items.find(item => item.id === 'wisdom_scroll')!],
      wisdom: 2
    },
    mp: 80,
    maxMp: 80,
    critRate: 10,
    critDamage: 150
  },
  {
    id: 'cynic',
    name: '犬儒主义者',
    description: '蔑视社会规范的愤世嫉俗者',
    philosophy: '犬儒主义',
    level: 2,
    hp: 120,
    maxHp: 120,
    attack: 12,
    defense: 8,
    wisdom: 10,
    strength: 7,
    skills: [basicSkills[0], basicSkills[1], basicSkills[2]],
    status: [],
    reward: {
      experience: 150,
      wisdom: 3,
      strength: 1
    },
    mp: 100,
    maxMp: 100,
    critRate: 12,
    critDamage: 150
  },
  {
    id: 'stoic',
    name: '斯多葛学者',
    description: '追求内心平静的智者',
    philosophy: '斯多葛主义',
    level: 3,
    hp: 150,
    maxHp: 150,
    attack: 15,
    defense: 12,
    wisdom: 15,
    strength: 8,
    skills: [basicSkills[0], philosophicalSkills[0]],
    status: [],
    reward: {
      experience: 200,
      items: [items.find(item => item.id === 'philosophers_stone')!],
      wisdom: 4
    },
    mp: 120,
    maxMp: 120,
    critRate: 15,
    critDamage: 160
  },
  {
    id: 'existentialist',
    name: '存在主义者',
    description: '探讨生命意义的思想家',
    philosophy: '存在主义',
    level: 4,
    hp: 180,
    maxHp: 180,
    attack: 18,
    defense: 10,
    wisdom: 18,
    strength: 9,
    skills: [basicSkills[0], philosophicalSkills[2]],
    status: [],
    reward: {
      experience: 250,
      wisdom: 5,
      strength: 2
    },
    mp: 150,
    maxMp: 150,
    critRate: 18,
    critDamage: 170
  }
]; 