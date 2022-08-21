import { memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import CellsCounter from './CellsCounter';
import Timer from './Timer';

const Header = () => {
  const { showTime, showCounter } = useSelector(
    (state: RootState) => state.game
  );
  return (
    <div className="flex text-gray-300/80 uppercase text-shadow">
      <div className="flex-2 hidden xs:flex text-3xl order-2 text-center">
        find black holes
      </div>
      <div className="flex justify-start flex-1 order-1 py-21 text-lg items-center">
        {showCounter && <CellsCounter />}
      </div>
      <div className="flex justify-end flex-1 order-3 text-lg items-center">
        {showTime && <Timer />}
      </div>
    </div>
  );
};

export default memo(Header);
