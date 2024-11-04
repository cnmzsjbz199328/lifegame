import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function ResourcePanel() {
  const resources = useSelector((state: RootState) => state.game.resources);

  return (
    <div className="border-l border-gray-800 p-4 h-full">
      <h2 className="text-lg mb-4">Resource Storage</h2>
      <div className="space-y-2">
        {Object.entries(resources).map(([resource, amount]) => (
          <div key={resource} className="flex justify-between">
            <span>{resource}:</span>
            <span>{amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 