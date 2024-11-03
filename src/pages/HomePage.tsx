import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayerStatus from '../components/PlayerStatus';
import PhilosophicalChallenge from '../components/PhilosophicalChallenge';
import AchievementsList from '../components/AchievementsList';
import AchievementNotification from '../components/AchievementNotification';
import { completeChapter, resetGame, updatePlayerStats } from '../store/gameSlice';
import { philosophicalChallenges } from '../data/challenges';
import { RootState } from '../store';
import { Inventory } from '../components/Inventory';
import { items } from '../data/items';
import { Battle } from '../components/Battle';
import { Character, Enemy, BattleReward, Item } from '../types/game';
import { enemies } from '../data/characters';
import { BattleRewardNotification } from '../components/BattleRewardNotification';
import { basicSkills } from '../data/characters';

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

  const [currentBattle, setCurrentBattle] = useState<Enemy | null>(null);

  const player: Character = {
    id: 'player',
    name: '哲学家',
    level: 1,
    hp: 100,
    maxHp: 100,
    attack: 12,
    defense: 8,
    wisdom: 10,
    strength: 6,
    skills: basicSkills,
    status: [],
    mp: 100,
    maxMp: 100,
    critRate: 15,  // 15% 暴击率
    critDamage: 150,  // 150% 暴击伤害
  };

  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState<BattleReward | null>(null);

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

  const handleBattleEnd = (won: boolean, reward?: BattleReward) => {
    if (won && reward) {
      dispatch(updatePlayerStats({
        experience: reward.experience,
        wisdom: reward.wisdom || 0,
        strength: reward.strength || 0
      }));

      if (reward.items) {
        setInventory(prev => ({
          ...prev,
          items: [...prev.items, ...(reward.items || [])]
        }));
      }

      setCurrentReward(reward);
      setShowReward(true);
    }
    setCurrentBattle(null);
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
      {currentBattle ? (
        <Battle
          player={player}
          enemy={currentBattle}
          inventory={inventory}
          onBattleEnd={handleBattleEnd}
          onUseItem={handleUseItem}
        />
      ) : (
        <div className="battle-selection mt-4">
          <h2 className="text-xl font-bold mb-4">选择对手</h2>
          <div className="grid grid-cols-2 gap-4">
            {enemies.map(enemy => (
              <button
                key={enemy.id}
                onClick={() => setCurrentBattle(enemy)}
                className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold">{enemy.name}</h3>
                <p className="text-sm text-gray-600">等级 {enemy.level}</p>
              </button>
            ))}
          </div>
        </div>
      )}
      {showReward && currentReward && (
        <BattleRewardNotification
          reward={currentReward}
          onClose={() => setShowReward(false)}
        />
      )}
    </div>
  );
}