import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DialogueChoice, PhilosophicalChallenge } from '../types/game';
import { updateBelief } from '../store/gameSlice';

interface Props {
  challenge: PhilosophicalChallenge;
  onComplete: () => void;
}

export default function PhilosophicalChallenge({ challenge, onComplete }: Props) {
  const [selectedChoice, setSelectedChoice] = useState<DialogueChoice | null>(null);
  const dispatch = useDispatch();

  const handleChoice = (choice: DialogueChoice) => {
    setSelectedChoice(choice);
    dispatch(updateBelief({
      id: challenge.concept,
      concept: challenge.concept,
      strength: choice.impact.strength,
      understanding: choice.impact.understanding,
    }));
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{challenge.question}</h2>
      <div className="space-y-4">
        {challenge.choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => handleChoice(choice)}
            className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}