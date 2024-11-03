import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function PlayerStatus() {
  const { level, experience, beliefs } = useSelector((state: RootState) => state.game);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">玩家状态</h3>
        <div className="text-sm text-gray-600">
          等级 {level} | 经验值 {experience}
        </div>
      </div>
      <div className="space-y-2">
        {beliefs.map((belief) => (
          <div key={belief.id} className="flex justify-between items-center">
            <span className="font-medium">{belief.concept}</span>
            <div className="text-sm">
              <span className="mr-4">理解: {belief.understanding}</span>
              <span>强度: {belief.strength}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}