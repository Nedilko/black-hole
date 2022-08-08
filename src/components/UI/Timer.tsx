import React from 'react';
import { MdOutlineTimer } from 'react-icons/md';
import { useGameStore } from '../../hooks/useGameStore';

const Timer = () => {
  const [{ time, showTime }] = useGameStore();
  // if (!showTime) return null;
  return (
    <div className={`flex items-center ${!showTime ? 'invisible' : ''}`}>
      {time}
      <MdOutlineTimer className="ml-2" />
    </div>
  );
};

export default React.memo(Timer);
