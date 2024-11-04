import React from 'react';

interface HealthBarProps {
  current: number;
  max: number;
  label?: string;
  width?: number; // 进度条的总长度字符数
}

const HealthBar: React.FC<HealthBarProps> = ({ 
  current, 
  max, 
  label,
  width = 20  // 默认长度20个字符
}) => {
  const percentage = Math.floor((current / max) * width);
  const filledBar = '█'.repeat(percentage);
  const emptyBar = '─'.repeat(width - percentage);
  
  return (
    <div className="font-mono">
      {label && <div className="text-green-500">{label}</div>}
      <div className="text-green-500">
        生命值：[{filledBar}{emptyBar}] {current}/{max}
      </div>
    </div>
  );
};

export default HealthBar; 