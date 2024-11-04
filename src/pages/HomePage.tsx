import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import GameInterface from '../components/GameInterface';

export default function HomePage() {
  const gameState = useSelector((state: RootState) => state.game);

  return (
    <div className="min-h-screen bg-black">
      <GameInterface />
    </div>
  );
}