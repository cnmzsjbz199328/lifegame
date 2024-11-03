import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { achievements } from '../data/achievements';

export default function AchievementNotification() {
  const playerAchievements = useSelector((state: RootState) => state.game.achievements);
  const [lastAchievement, setLastAchievement] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (playerAchievements.length > 0) {
      const newAchievement = playerAchievements[playerAchievements.length - 1];
      if (newAchievement !== lastAchievement) {
        setLastAchievement(newAchievement);
        setShow(true);
        setTimeout(() => setShow(false), 3000);
      }
    }
  }, [playerAchievements, lastAchievement]);

  if (!show || !lastAchievement) return null;

  const achievement = achievements.find(a => a.id === lastAchievement);
  if (!achievement) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{achievement.icon}</span>
        <div>
          <h4 className="font-bold">成就解锁！</h4>
          <p className="text-sm">{achievement.title}</p>
        </div>
      </div>
    </div>
  );
}