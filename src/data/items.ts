import { Item } from '../types/game';

export const items: Item[] = [
  {
    id: 'health_potion',
    name: '生命药水',
    description: '恢复50点生命值',
    type: 'consumable',
    rarity: 'common',
    stackable: true,
    quantity: 3,
    effects: {
      hp: 50
    }
  },
  {
    id: 'mana_potion',
    name: '魔法药水',
    description: '恢复30点魔法值',
    type: 'consumable',
    rarity: 'common',
    stackable: true,
    quantity: 3,
    effects: {
      mp: 30
    }
  },
  {
    id: 'logic_sword',
    name: '逻辑之剑',
    description: '锋利的剑刃蕴含着严密的逻辑力量',
    type: 'weapon',
    rarity: 'rare',
    stackable: false,
    equipSlot: 'weapon',
    effects: {
      attack: 15,
      critRate: 10,
      critDamage: 50
    }
  },
  {
    id: 'wisdom_robe',
    name: '智慧长袍',
    description: '充满智慧的法师长袍',
    type: 'equipment',
    rarity: 'rare',
    stackable: false,
    equipSlot: 'armor',
    effects: {
      defense: 10,
      wisdom: 5,
      mp: 20
    }
  }
]; 