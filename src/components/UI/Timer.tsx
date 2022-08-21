import { useEffect, memo } from 'react';
import { MdOutlineTimer } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { gameActions } from '../../store/actions';
import { getTime } from '../../utils';

const Timer = () => {
  const dispatch = useDispatch();
  const { time, isStarted } = useSelector((state: RootState) => state.game);

  useEffect(() => {
    const interval = setTimeout(() => {
      isStarted && dispatch(gameActions.updateTime());
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
