import React, { useState, useEffect } from 'react';
import { Character, Skill, BattleState, Enemy, BattleReward, Item, Inventory } from '../types/game';
import { Shield, Sword, Heart, Zap } from 'lucide-react';

interface BattleProps {
  player: Character;
  enemy: Enemy;
  inventory: Inventory;
  onBattleEnd: (won: boolean, reward?: BattleReward) => void;
  onUseItem: (item: Item) => void;
}

export const Battle: React.FC<BattleProps> = ({
  player,
  enemy,
  inventory,
  onBattleEnd,
  onUseItem
}) => {
  if (!player || !enemy || !inventory) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  const [battleState, setBattleState] = useState<BattleState>({
    player: { ...player },
    enemy: { ...enemy },
    turn: 'player',
    log: [`战斗开始：${player.name} VS ${enemy.name}`],
    isOver: false
  });

  const [hasTriggeredReward, setHasTriggeredReward] = useState(false);

  const calculateDamage = (skill: Skill, attacker: Character, defender: Character): { damage: number; isCrit: boolean } => {
    const base = skill.damage || 0;
    const attackPower = attacker.attack * (1 + attacker.strength / 100);
    const defense = defender.defense;
    
    // 计算暴击
    const isCrit = Math.random() * 100 < attacker.critRate;
    const critMultiplier = isCrit ? (1 + attacker.critDamage / 100) : 1;
    
    const damage = Math.floor((base + attackPower) * (100 / (100 + defense)) * critMultiplier);
    return { damage, isCrit };
  };

  const handleSkillUse = (skill: Skill) => {
    if (battleState.turn !== 'player' || battleState.isOver) return;
    
    if (battleState.player.mp < skill.cost) {
      setBattleState(prev => ({
        ...prev,
        log: [...prev.log, '魔法值不足！']
      }));
      return;
    }

    const { damage, isCrit } = calculateDamage(skill, player, enemy);
    
    setBattleState(prev => {
      const newState = { ...prev };
      newState.player.mp -= skill.cost;
      newState.enemy.hp = Math.max(0, prev.enemy.hp - damage);
      newState.log.push(
        `${player.name} 使用了 ${skill.name}，` +
        `${isCrit ? '暴击！' : ''}造成 ${damage} 点伤害！`
      );

      if (newState.enemy.hp <= 0) {
        newState.isOver = true;
        newState.log.push(`${player.name} 获胜！`);
      } else {
        newState.turn = 'enemy';
      }

      return newState;
    });
  };

  useEffect(() => {
    if (battleState.isOver && !hasTriggeredReward) {
      setHasTriggeredReward(true);
      if (battleState.enemy.hp <= 0) {
        if (enemy && enemy.reward) {
          onBattleEnd(true, enemy.reward);
        }
      } else if (battleState.player.hp <= 0) {
        onBattleEnd(false);
      }
    }
  }, [battleState.isOver, hasTriggeredReward, enemy]);

  const handleUseItem = (item: Item) => {
    if (battleState.turn !== 'player' || battleState.isOver) return;

    setBattleState(prev => {
      const newState = { ...prev };
      if (item.effects && item.effects.length > 0) {
        // 遍历所有效果并应用
        item.effects.forEach(effect => {
          if (effect.effect.hp) {
            newState.player.hp = Math.min(
              player.maxHp,
              newState.player.hp + effect.effect.hp
            );
          }
          if (effect.effect.mp) {
            newState.player.mp = Math.min(
              player.maxMp,
              newState.player.mp + effect.effect.mp
            );
          }
        });
      }

      newState.log.push(`${player.name} 使用了 ${item.name}`);
      newState.turn = 'enemy';
      return newState;
    });

    onUseItem(item);
  };

  useEffect(() => {
    if (battleState.turn === 'enemy' && !battleState.isOver) {
      const timeoutId = setTimeout(() => {
        const enemySkill = enemy.skills[Math.floor(Math.random() * enemy.skills.length)];
        const { damage, isCrit } = calculateDamage(enemySkill, enemy, player);

        setBattleState(prev => {
          const newState = { ...prev };
          newState.player.hp = Math.max(0, prev.player.hp - damage);
          newState.log.push(
            `${enemy.name} 使用了 ${enemySkill.name}，` +
            `${isCrit ? '暴击！' : ''}造成 ${damage} 点伤害！`
          );

          if (newState.player.hp <= 0) {
            newState.isOver = true;
            newState.log.push(`${enemy.name} 获胜！`);
          } else {
            newState.turn = 'player';
          }

          return newState;
        });
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [battleState.turn]);

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-white">
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold">{player.name}</h3>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-red-400" />
                  HP: {battleState.player.hp}/{player.maxHp}
                </span>
              </div>
              <div className="h-2 bg-gray-600 rounded">
                <div
                  className="h-2 bg-gradient-to-r from-red-500 to-red-400 rounded transition-all duration-300"
                  style={{ width: `${(battleState.player.hp / player.maxHp) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-blue-400" />
                  MP: {battleState.player.mp}/{player.maxMp}
                </span>
              </div>
              <div className="h-2 bg-gray-600 rounded">
                <div
                  className="h-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded transition-all duration-300"
                  style={{ width: `${(battleState.player.mp / player.maxMp) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Sword className="w-6 h-6 text-red-400" />
            <h3 className="text-xl font-bold">{enemy.name}</h3>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-400" />
                HP: {battleState.enemy.hp}/{enemy.maxHp}
              </span>
            </div>
            <div className="h-2 bg-gray-600 rounded">
              <div
                className="h-2 bg-gradient-to-r from-red-600 to-red-500 rounded transition-all duration-300"
                style={{ width: `${(battleState.enemy.hp / enemy.maxHp) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="text-xl font-bold mb-2">{enemy.name}</h3>
        <p className="text-gray-300 mb-2">{enemy.description}</p>
        <p className="text-sm text-blue-400">哲学流派：{enemy.philosophy}</p>
      </div>

      <div className="bg-gray-700 rounded-lg p-4 mb-6 h-40 overflow-y-auto">
        {battleState.log.map((log, index) => (
          <div key={index} className="text-sm text-gray-300 mb-1">{log}</div>
        ))}
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-bold mb-3">道具</h4>
        <div className="grid grid-cols-4 gap-3">
          {inventory.items
            ?.filter((item: Item) => item.type === 'consumable')
            .map((item: Item) => (
              <button
                key={item.id}
                onClick={() => handleUseItem(item)}
                disabled={battleState.turn !== 'player' || battleState.isOver}
                className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:hover:bg-gray-700 transition-colors"
              >
                <div className="text-sm font-semibold">{item.name}</div>
                {item.quantity && (
                  <div className="text-xs text-gray-400">x{item.quantity}</div>
                )}
              </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {player.skills?.map((skill: Skill) => (
          <button
            key={skill.id}
            onClick={() => handleSkillUse(skill)}
            disabled={battleState.turn !== 'player' || battleState.isOver}
            className="bg-gradient-to-r from-blue-600 to-blue-500 p-3 rounded-lg hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 disabled:hover:from-blue-600 disabled:hover:to-blue-500 transition-all duration-300"
          >
            {skill.name}
          </button>
        ))}
      </div>

      {battleState.isOver && enemy && enemy.reward && (
        <div className="mt-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-4">
          <h4 className="font-bold text-lg mb-2">战斗奖励</h4>
          <ul className="space-y-1 text-sm">
            <li>经验值：+{enemy.reward.experience}</li>
            {enemy.reward.wisdom && <li>智慧：+{enemy.reward.wisdom}</li>}
            {enemy.reward.strength && <li>力量：+{enemy.reward.strength}</li>}
            {enemy.reward.items && enemy.reward.items.length > 0 && (
              <li>
                获得物品：
                {enemy.reward.items.map(item => item?.name || '未知物品').join(', ')}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};