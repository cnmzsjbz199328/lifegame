import React, { useState } from 'react';
import { Character, Enemy, BattleReward, Item } from '../types/game';
import HealthBar from './HealthBar';

interface BattleProps {
  player: Character;
  enemy: Enemy;
  inventory: {
    items: Item[];
    capacity: number;
  };
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
  const [playerHp, setPlayerHp] = useState(player.hp);
  const [enemyHp, setEnemyHp] = useState(enemy.hp);
  const [battleLog, setBattleLog] = useState<string[]>([
    `一场与${enemy.name}的战斗开始了！`
  ]);

  const addToBattleLog = (message: string) => {
    setBattleLog(prev => [...prev, message]);
  };

  const handleAction = (action: string) => {
    let damage: number;
    let counterDamage: number;

    switch (action) {
      case 'attack':
        damage = Math.floor(Math.random() * player.attack) + player.attack/2;
        const newEnemyHp = Math.max(0, enemyHp - damage);
        setEnemyHp(newEnemyHp);
        addToBattleLog(`你挥舞手中的剑，用力劈向${enemy.name}！造成了${damage}点伤害！`);
        addToBattleLog(`【敌人状态】\n${enemy.name}生命值: ${renderHealthBar(newEnemyHp, enemy.maxHp)}`);

        if (newEnemyHp > 0) {
          counterDamage = Math.floor(Math.random() * enemy.attack) + enemy.attack/2;
          const newPlayerHp = Math.max(0, playerHp - counterDamage);
          setPlayerHp(newPlayerHp);
          addToBattleLog(`\n${enemy.name}反击，狠狠地咬住了你的手臂！造成了${counterDamage}点伤害！`);
          addToBattleLog(`【你的状态】\n生命值: ${renderHealthBar(newPlayerHp, player.maxHp)}`);

          if (newPlayerHp <= 0) {
            addToBattleLog('\n你被打败了...');
            onBattleEnd(false);
          }
        } else {
          addToBattleLog(`\n${enemy.name}倒下了！你获得了胜利！`);
          onBattleEnd(true, enemy.reward);
        }
        break;

      case 'defend':
        counterDamage = Math.floor((Math.random() * enemy.attack + enemy.attack/2) * 0.5);
        const newPlayerHp = Math.max(0, playerHp - counterDamage);
        setPlayerHp(newPlayerHp);
        addToBattleLog('你摆出防御姿态，减少了受到的伤害！');
        addToBattleLog(`${enemy.name}的攻击造成了${counterDamage}点伤害！`);
        addToBattleLog(`【你的状态】\n生命值: ${renderHealthBar(newPlayerHp, player.maxHp)}`);
        break;

      case 'flee':
        if (Math.random() > 0.5) {
          addToBattleLog('你成功逃脱了战斗！');
          onBattleEnd(false);
        } else {
          addToBattleLog('逃跑失败！');
          counterDamage = Math.floor(Math.random() * enemy.attack) + enemy.attack/2;
          const newPlayerHp = Math.max(0, playerHp - counterDamage);
          setPlayerHp(newPlayerHp);
          addToBattleLog(`${enemy.name}的攻击造成了${counterDamage}点伤害！`);
          addToBattleLog(`【你的状态】\n生命值: ${renderHealthBar(newPlayerHp, player.maxHp)}`);
        }
        break;
    }
  };

  const healingPotions = inventory.items.filter(item => 
    item.type === 'consumable' && item.effects?.some(effect => effect.effect.hp)
  );

  return (
    <div className="font-mono text-green-500 space-y-4">
      {/* Battle Log */}
      <div className="space-y-2 mb-4">
        {battleLog.map((log, index) => (
          <pre key={index} className="whitespace-pre-wrap">{log}</pre>
        ))}
      </div>

      {/* Action Menu */}
      <div className="space-y-2">
        <div className="text-yellow-500">【选择你的行动】</div>
        <button 
          onClick={() => handleAction('attack')} 
          className="block w-full text-left px-4 py-2 hover:bg-gray-900"
        >
          1. 继续攻击
        </button>
        <button 
          onClick={() => handleAction('defend')} 
          className="block w-full text-left px-4 py-2 hover:bg-gray-900"
        >
          2. 防御
        </button>
        <button 
          onClick={() => handleAction('flee')} 
          className="block w-full text-left px-4 py-2 hover:bg-gray-900"
        >
          3. 逃跑
        </button>
        {healingPotions.length > 0 && (
          <button 
            onClick={() => {
              const potion = healingPotions[0];
              onUseItem(potion);
              const healing = potion.effects?.[0].effect.hp || 0;
              const newHp = Math.min(player.maxHp, playerHp + healing);
              setPlayerHp(newHp);
              addToBattleLog(`你使用了${potion.name}，恢复了${healing}点生命值！`);
              addToBattleLog(`【你的状态】\n生命值: ${renderHealthBar(newHp, player.maxHp)}`);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-900"
          >
            4. 使用治疗药水
          </button>
        )}
      </div>

      <div className="text-green-500">
        <div>一场与诡辩者的战斗开始了！</div>
        
        <div className="mt-4">
          <HealthBar 
            current={playerHp} 
            max={100} 
            label="【你的状态】"
          />
          
          <HealthBar 
            current={enemyHp} 
            max={100} 
            label="【敌人状态】"
          />
        </div>
      </div>
    </div>
  );
};