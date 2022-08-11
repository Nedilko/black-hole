import React from 'react';
import { MdOutlineTimer } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Timer = () => {
  const { time } = useSelector((state: RootState) => state.game);

  return (
    <div className={`flex items-center`}>
      {time}
      <MdOutlineTimer className="ml-2" />
    </div>
  );
};

export default React.memo(Timer);
