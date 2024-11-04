'use client'

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import PhilosophicalChallenge from './PhilosophicalChallenge';
import { Battle } from './Battle';
import { philosophicalChallenges } from '../data/challenges';
import { enemies } from '../data/characters';
import { Character, Enemy, BattleReward } from '../types/game';
import { updatePlayerStats, addDiaryEntry } from '../store/gameSlice';

export default function GameInterface() {
  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.game);
  const [currentBattle, setCurrentBattle] = useState<Enemy | null>(null);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  // 基础角色属性
  const player: Character = {
    id: 'player',
    name: '哲学家',
    description: '一位追求智慧的求道者',
    level: gameState.level,
    hp: 100,
    maxHp: 100,
    mp: 100,
    maxMp: 100,
    attack: 12,
    defense: 8,
    wisdom: 10,
    strength: 6,
    skills: [], // 从数据文件中加载技能
    status: [],
    critRate: 15,
    critDamage: 150,
  };

  const handleChallengeComplete = () => {
    if (currentChallengeIndex < philosophicalChallenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      dispatch(addDiaryEntry({
        text: "A new philosophical insight emerges...",
        type: 'discovery'
      }));
    }
  };

  const handleBattleEnd = (won: boolean, reward?: BattleReward) => {
    if (won && reward) {
      dispatch(updatePlayerStats({
        experience: reward.experience,
        wisdom: reward.wisdom || 0,
        strength: reward.strength || 0
      }));
      dispatch(addDiaryEntry({
        text: `Battle won! Gained ${reward.experience} experience.`,
        type: 'discovery'
      }));
    }
    setCurrentBattle(null);
  };

  // 创建正确格式的 inventory 对象
  const inventoryWithCapacity = {
    items: gameState.inventory,
    capacity: 20  // 或者其他你想设置的容量值
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="grid grid-cols-[300px_1fr_300px] gap-0 h-screen">
        {/* Left Panel - Diary */}
        <div className="border-r border-gray-800 p-4 overflow-y-auto">
          <h2 className="text-lg mb-4">Dear Diary</h2>
          <div className="space-y-2">
            {gameState.diaryEntries.map((entry, index) => (
              <p 
                key={index} 
                className={`${
                  entry.type === 'warning' ? 'text-red-500' : 
                  entry.type === 'discovery' ? 'text-yellow-500' : 
                  'text-gray-400'
                }`}
              >
                {entry.text}
              </p>
            ))}
          </div>
        </div>

        {/* Middle Panel - Main Game Area */}
        <div className="p-4 relative">
          {/* Location Header */}
          <div className="flex justify-center items-center mb-8 text-gray-500">
            <span>@</span>
            <span className="ml-2 text-white">{gameState.currentLocation}</span>
          </div>

          {/* Main Content Area */}
          <div className="space-y-4">
            {currentBattle ? (
              <Battle
                player={player}
                enemy={currentBattle}
                inventory={inventoryWithCapacity}  // 使用正确格式的 inventory
                onBattleEnd={handleBattleEnd}
                onUseItem={() => {}}
              />
            ) : (
              <>
                {currentChallengeIndex < philosophicalChallenges.length && (
                  <PhilosophicalChallenge
                    challenge={philosophicalChallenges[currentChallengeIndex]}
                    onComplete={handleChallengeComplete}
                  />
                )}
                <div className="mt-4 space-y-2">
                  {enemies.map(enemy => (
                    <button
                      key={enemy.id}
                      onClick={() => setCurrentBattle(enemy)}
                      className="w-full text-left px-4 py-2 border border-gray-800 hover:bg-gray-900"
                    >
                      Battle: {enemy.name} - {enemy.philosophy}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Experience Display */}
          <div className="absolute bottom-4 left-4">
            Experience: {gameState.experience}
          </div>
        </div>

        {/* Right Panel - Resources & Stats */}
        <div className="border-l border-gray-800 p-4">
          <h2 className="text-lg mb-4">Status</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-500 mb-2">Level & Experience</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Level:</span>
                  <span>{gameState.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Experience:</span>
                  <span>{gameState.experience}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-gray-500 mb-2">Beliefs</h3>
              <div className="space-y-1">
                {gameState.beliefs.map(belief => (
                  <div key={belief.id} className="space-y-1">
                    <div>{belief.concept}</div>
                    <div className="text-sm text-gray-500">
                      Understanding: {belief.understanding} | Strength: {belief.strength}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-800 p-2 flex justify-between text-gray-600 text-sm">
        <div>Cat</div>
        <div>Suspicious looking creature, somehow able to produce human speech.</div>
        <div>prototype release 1.0</div>
      </div>
    </div>
  );
} 