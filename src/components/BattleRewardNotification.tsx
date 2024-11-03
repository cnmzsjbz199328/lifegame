import React from 'react';
import { BattleReward } from '../types/game';

interface BattleRewardNotificationProps {
  reward: BattleReward;
  onClose: () => void;
}

export const BattleRewardNotification: React.FC<BattleRewardNotificationProps> = ({
  reward,
  onClose
}) => {
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-green-100 rounded-lg shadow-lg animate-slide-up">
      <h4 className="font-bold text-green-800">获得战斗奖励！</h4>
      <ul className="text-sm text-green-700">
        <li>经验值：+{reward.experience}</li>
        {reward.wisdom && <li>智慧：+{reward.wisdom}</li>}
        {reward.strength && <li>力量：+{reward.strength}</li>}
        {reward.items && (
          <li>
            获得物品：
            {reward.items.map(item => item.name).join(', ')}
          </li>
        )}
      </ul>
      <button
        onClick={onClose}
        className="mt-2 px-2 py-1 text-sm text-green-800 hover:text-green-900"
      >
        关闭
      </button>
    </div>
  );
}; 