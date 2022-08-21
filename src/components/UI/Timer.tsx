import { useEffect, memo } from 'react';
import { MdOutlineTimer } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { gameActions } from '../../store/actions';

const getTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`;
};

const Timer = () => {
  const dispatch = useDispatch();
  const { time } = useSelector((state: RootState) => state.game);

  useEffect(() => {
    const interval = setTimeout(() => {
      dispatch(gameActions.updateTime());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, time]);

  return (
    <>
      <div>{getTime(time)}</div>
      <MdOutlineTimer className="ml-2" />
    </>
  );
};

export default memo(Timer);
