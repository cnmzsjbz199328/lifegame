import React from 'react';
import { Item } from '../types/game';

interface InventoryProps {
  items: Item[];
  capacity: number;
  onUseItem?: (item: Item) => void;
  onDropItem?: (item: Item) => void;
}

export const Inventory: React.FC<InventoryProps> = ({
  items,
  capacity,
  onUseItem,
  onDropItem,
}) => {
  return (
    <div className="inventory-container">
      <h2 className="text-xl font-bold mb-4">背包 ({items.length}/{capacity})</h2>
      <div className="grid grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="inventory-slot bg-gray-100 p-4 rounded-lg hover:bg-gray-200 cursor-pointer"
          >
            <div className={`item-name text-${item.rarity}`}>{item.name}</div>
            <div className="text-sm text-gray-600">{item.description}</div>
            {item.quantity && <div className="text-sm">数量: {item.quantity}</div>}
            <div className="flex gap-2 mt-2">
              {onUseItem && (
                <button
                  onClick={() => onUseItem(item)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  使用
                </button>
              )}
              {onDropItem && (
                <button
                  onClick={() => onDropItem(item)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  丢弃
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 