import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function DiaryPanel() {
  const diaryEntries = useSelector((state: RootState) => state.game.diaryEntries);

  return (
    <div className="border-r border-gray-800 p-4 overflow-y-auto h-full">
      <h2 className="text-lg mb-4">Dear Diary</h2>
      <div className="space-y-2">
        {diaryEntries.map((entry, index) => (
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
  );
} 