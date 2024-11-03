'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Star } from 'lucide-react'
import { PlayerState } from '../types/game'

export default function GameInterface() {
  const [playerState, setPlayerState] = useState<PlayerState>({
    level: 1,
    experience: 0,
    inventory: [],
    beliefs: [],
    completedChapters: [],
    achievements: []
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">战斗的一生</h1>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            重新开始
          </button>
        </div>

        {/* Player Status */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 rounded-lg p-4 shadow-lg"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Shield className="w-8 h-8 text-blue-400" />
              <div>
                <h2 className="text-xl font-semibold">玩家状态</h2>
                <p className="text-gray-400">
                  等级 {playerState.level} | 经验值 {playerState.experience}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${
                    i < playerState.level ? 'text-yellow-400' : 'text-gray-600'
                  }`} 
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 