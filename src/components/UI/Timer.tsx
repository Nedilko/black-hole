import { useEffect, memo } from 'react';
import { MdOutlineTimer } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateTime } from '../../store/gameSlice';
import { selectGame } from '../../store/selectors';
import { getTime } from '../../utils/time';

const Timer = () => {
  const dispatch = useAppDispatch();
  const { time, isStarted } = useAppSelector(selectGame);

  useEffect(() => {
    const interval = setTimeout(() => {
      isStarted && dispatch(updateTime());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, time, isStarted]);

  return (
    <>
      <div>{getTime(time)}</div>
      <MdOutlineTimer className="ml-2" />
    </>
  );
};

export default memo(Timer);
