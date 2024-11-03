import React from 'react';
import { useDispatch } from 'react-redux';
import { PhilosophicalChallengeType, DialogueChoice } from '../types/game';
import { updateBelief } from '../store/gameSlice';

interface PhilosophicalChallengeProps {
  challenge: PhilosophicalChallengeType;
  onComplete: () => void;
}

const PhilosophicalChallenge: React.FC<PhilosophicalChallengeProps> = ({
  challenge,
  onComplete
}) => {
  const dispatch = useDispatch();

  const handleChoice = (choice: DialogueChoice) => {
    dispatch(updateBelief({
      id: choice.impact.belief,
      strength: choice.impact.strength,
      understanding: choice.impact.understanding
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
};

export default PhilosophicalChallenge;