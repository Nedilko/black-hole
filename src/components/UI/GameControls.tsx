import { MdReplay, MdOutlineArrowUpward } from 'react-icons/md';
import { showMainMenu, restartGame } from '../../store/gameSlice';
import { useAppDispatch } from '../../hooks';

const GameControls = () => {
  const dispatch = useAppDispatch();

  const handleBackToMenu = () => {
    dispatch(showMainMenu());
  };

  const handleTryAgain = () => {
    dispatch(restartGame());
  };

  return (
    <div className="flex flex-row gap-x-8 upppercase">
      <button
        onClick={handleTryAgain}
        className="flex text-3xl items-center text-gray-300/80 uppercase hover:text-shadow hover:text-gray-300 transition-all duration-150"
      >
        <MdReplay />
        try again
      </button>
      <button
        onClick={handleBackToMenu}
        className="flex text-3xl items-center text-gray-300/80 uppercase hover:text-shadow hover:text-gray-300 transition-all duration-150"
      >
        main menu
        <MdOutlineArrowUpward />
      </button>
    </div>
  );
};

export default GameControls;
