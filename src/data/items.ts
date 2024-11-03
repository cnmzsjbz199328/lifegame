import { Item } from '../types/game';

export const items: Item[] = [
  {
    id: 'wisdom_scroll',
    name: '智慧卷轴',
    description: '阅读后可以获得智慧点数',
    type: 'consumable',
    rarity: 'common',
    stackable: true,
    quantity: 1,
    effects: {
      wisdom: 5
    }
  },
  {
    id: 'philosophers_stone',
    name: '哲学家之石',
    description: '蕴含着深邃的哲学智慧',
    type: 'equipment',
    rarity: 'legendary',
    stackable: false,
    effects: {
      wisdom: 20,
      strength: 10
    }
  },
  // 可以添加更多道具...
]; 