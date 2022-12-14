import { memo } from 'react';
import { useAppSelector } from '../../hooks';
import { selectGame } from '../../store/selectors';
import CellsCounter from './CellsCounter';
import Timer from './Timer';

const Header = () => {
  const { showTime, showCounter } = useAppSelector(selectGame);
  return (
    <div className="flex text-gray-300/80 uppercase text-shadow border-b-2 border-gray-400/50 pb-4">
      <div className="flex-2 hidden xxs:flex xs:text-3xl text-xl order-2 text-center">
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
