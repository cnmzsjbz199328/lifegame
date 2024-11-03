import { Item } from '../types/game';

export const items: Item[] = [
  {
    id: 'wisdom_scroll',
    name: '智慧卷轴',
    description: '古老的智慧结晶',
    value: 100,
    quantity: 1,
    type: 'consumable',
    rarity: 'rare',
    effects: [{
      id: 'wisdom_boost',
      name: '智慧提升',
      duration: 3,
      effect: {
        wisdom: 5
      }
    }]
  },
  {
    id: 'philosophers_stone',
    name: '贤者之石',
    description: '蕴含强大力量的神秘宝石',
    value: 500,
    quantity: 1,
    type: 'artifact',
    rarity: 'legendary',
    effects: [{
      id: 'enlightenment',
      name: '启迪',
      duration: 5,
      effect: {
        wisdom: 10,
        mp: 20
      }
    }]
  },
  {
    id: 'healing_potion',
    name: '治疗药水',
    description: '恢复生命力的药水',
    value: 50,
    quantity: 1,
    type: 'consumable',
    rarity: 'common',
    effects: [{
      id: 'healing',
      name: '治疗',
      duration: 1,
      effect: {
        hp: 30
      }
    }]
  },
  {
    id: 'mana_potion',
    name: '魔力药水',
    description: '恢复魔力的药水',
    value: 50,
    quantity: 1,
    type: 'consumable',
    rarity: 'common',
    effects: [{
      id: 'mana_restore',
      name: '魔力恢复',
      duration: 1,
      effect: {
        mp: 30
      }
    }]
  }
]; 