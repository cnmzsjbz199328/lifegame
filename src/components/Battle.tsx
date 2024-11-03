import React, { useState, useEffect } from 'react';
import { Character, Skill, BattleState, Enemy, BattleReward, Item, Inventory } from '../types/game';

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
  const [battleState, setBattleState] = useState<BattleState>({
    player: { ...player },
    enemy: { ...enemy },
    turn: 'player',
    log: [`战斗开始：${player.name} VS ${enemy.name}`],
    isOver: false
  });

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
    if (battleState.isOver) {
      if (battleState.enemy.hp <= 0) {
        onBattleEnd(true, enemy.reward);
      } else if (battleState.player.hp <= 0) {
        onBattleEnd(false);
      }
    }
  }, [battleState.isOver]);

  const handleUseItem = (item: Item) => {
    if (battleState.turn !== 'player' || battleState.isOver) return;

    setBattleState(prev => {
      const newState = { ...prev };
      if (item.effects) {
        if (item.effects.hp) {
          newState.player.hp = Math.min(
            player.maxHp,
            newState.player.hp + item.effects.hp
          );
        }
        if (item.effects.mp) {
          newState.player.mp = Math.min(
            player.maxMp,
            newState.player.mp + item.effects.mp
          );
        }
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

  if (!player || !enemy) {
    return <div>Loading...</div>;
  }

  return (
    <div className="battle-container p-4 bg-gray-100 rounded-lg">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="character-status p-4 bg-white rounded-lg">
          <h3 className="text-xl font-bold">{player.name}</h3>
          <div className="hp-bar mb-2">
            HP: {battleState.player.hp}/{player.maxHp}
            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-green-500 rounded"
                style={{ width: `${(battleState.player.hp / player.maxHp) * 100}%` }}
              />
            </div>
          </div>
          <div className="mp-bar">
            MP: {battleState.player.mp}/{player.maxMp}
            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-blue-500 rounded"
                style={{ width: `${(battleState.player.mp / player.maxMp) * 100}%` }}
              />
            </div>
          </div>
        </div>
        <div className="character-status p-4 bg-white rounded-lg">
          <h3 className="text-xl font-bold">{enemy.name}</h3>
          <div className="hp-bar">
            HP: {enemy.hp}/{enemy.maxHp}
            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-red-500 rounded"
                style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="enemy-info mb-4 p-4 bg-white rounded-lg">
        <h3 className="text-xl font-bold">{enemy.name}</h3>
        <p className="text-gray-600">{enemy.description}</p>
        <p className="text-sm text-blue-600">哲学流派：{enemy.philosophy}</p>
      </div>

      <div className="battle-log h-40 overflow-y-auto bg-white p-4 rounded-lg mb-4">
        {battleState.log.map((log, index) => (
          <div key={index} className="text-sm">{log}</div>
        ))}
      </div>

      <div className="items-container mb-4">
        <h4 className="font-bold mb-2">道具</h4>
        <div className="grid grid-cols-4 gap-2">
          {inventory.items
            .filter(item => item.type === 'consumable')
            .map(item => (
              <button
                key={item.id}
                onClick={() => handleUseItem(item)}
                disabled={battleState.turn !== 'player' || battleState.isOver}
                className="p-2 bg-white rounded border hover:bg-gray-50 disabled:opacity-50"
              >
                {item.name}
                {item.quantity && <span className="text-sm ml-1">x{item.quantity}</span>}
              </button>
            ))}
        </div>
      </div>

      <div className="skills-container grid grid-cols-2 gap-2">
        {player.skills?.map((skill) => (
          <button
            key={skill.id}
            onClick={() => handleSkillUse(skill)}
            disabled={battleState.turn !== 'player' || battleState.isOver}
            className="skill-button p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {skill.name}
          </button>
        ))}
      </div>

      {battleState.isOver && (
        <div className="reward-info p-4 bg-green-100 rounded-lg">
          <h4 className="font-bold text-green-800">战斗奖励：</h4>
          <ul className="text-sm text-green-700">
            <li>经验值：+{enemy.reward.experience}</li>
            {enemy.reward.wisdom && <li>智慧：+{enemy.reward.wisdom}</li>}
            {enemy.reward.strength && <li>力量：+{enemy.reward.strength}</li>}
            {enemy.reward.items && (
              <li>
                获得物品：
                {enemy.reward.items.map(item => item.name).join(', ')}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};