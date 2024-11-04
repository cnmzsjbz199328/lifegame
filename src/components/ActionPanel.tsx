import React from 'react';
import { useDispatch } from 'react-redux';
import { addDiaryEntry, updateResources } from '../store/gameSlice';

export default function ActionPanel() {
  const dispatch = useDispatch();

  const handleAction = (action: string) => {
    // 动作处理逻辑...
  };

  return (
    <div className="space-y-2 mb-8">
      <button 
        onClick={() => handleAction('explore')}
        className="w-48 text-left px-4 py-2 border border-gray-800 hover:bg-gray-900"
      >
        Explore
      </button>
      <button 
        onClick={() => handleAction('scavenge')}
        className="w-48 text-left px-4 py-2 border border-gray-800 hover:bg-gray-900"
      >
        Scavenge
      </button>
      <button 
        onClick={() => handleAction('dredge')}
        className="w-48 text-left px-4 py-2 border border-gray-800 hover:bg-gray-900"
      >
        Dredge
      </button>
    </div>
  );
} 