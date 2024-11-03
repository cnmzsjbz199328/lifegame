import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayerStatus from '../components/PlayerStatus';
import PhilosophicalChallenge from '../components/PhilosophicalChallenge';
import AchievementsList from '../components/AchievementsList';
import AchievementNotification from '../components/AchievementNotification';
import { completeChapter, resetGame } from '../store/gameSlice';
import { philosophicalChallenges } from '../data/challenges';
import { RootState } from '../store';
import { Inventory } from '../components/Inventory';
import { items } from '../data/items';

export default function HomePage() {
  const dispatch = useDispatch();
  const completedChapters = useSelector((state: RootState) => state.game.completedChapters);
  const [currentChallengeIndex, setCurrentChallengeIndex] = React.useState(() => {
    return completedChapters.length < philosophicalChallenges.length
      ? completedChapters.length
      : philosophicalChallenges.length;
  });

  const [inventory, setInventory] = useState({
    items: items.slice(0, 2), // 初始道具
    capacity: 16
  });

  const handleChallengeComplete = () => {
    dispatch(completeChapter(philosophicalChallenges[currentChallengeIndex].id));
    if (currentChallengeIndex < philosophicalChallenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    if (window.confirm('确定要重新开始游戏吗？这将清除所有进度。')) {
      dispatch(resetGame());
      setCurrentChallengeIndex(0);
    }
  };

  const handleUseItem = (item: Item) => {
    // 处理使用道具的逻辑
    if (item.type === 'consumable') {
      setInventory(prev => ({
        ...prev,
        items: prev.items.filter(i => i.id !== item.id)
      }));
      // 应用道具效果...
    }
  };

  const handleDropItem = (item: Item) => {
    setInventory(prev => ({
      ...prev,
      items: prev.items.filter(i => i.id !== item.id)
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">战斗的一生</h1>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          重新开始
        </button>
      </div>
      <PlayerStatus />
      <AchievementsList />
      {currentChallengeIndex < philosophicalChallenges.length ? (
        <PhilosophicalChallenge
          challenge={philosophicalChallenges[currentChallengeIndex]}
          onComplete={handleChallengeComplete}
        />
      ) : (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">旅程完成</h2>
          <p className="text-gray-600 mb-4">恭喜你完成了所有的哲学挑战！</p>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            开始新的旅程
          </button>
        </div>
      )}
      <AchievementNotification />
      <Inventory
        items={inventory.items}
        capacity={inventory.capacity}
        onUseItem={handleUseItem}
        onDropItem={handleDropItem}
      />
    </div>
  );
}