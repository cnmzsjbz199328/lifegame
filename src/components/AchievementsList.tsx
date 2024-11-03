import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { achievements } from '../data/achievements';

export default function AchievementsList() {
  const playerAchievements = useSelector((state: RootState) => state.game.achievements) || [];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4">成就</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => {
          const unlocked = playerAchievements.includes(achievement.id);
          return (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border ${
                unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h4 className="font-medium">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}