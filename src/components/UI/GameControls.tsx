import { MdReplay, MdOutlineArrowUpward } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { gameActions } from '../../store/actions';
import { settingsActions } from '../../store/actions';

const GameControls = () => {
  const dispatch = useDispatch();

  const handleBackToMenu = () => {
    dispatch(gameActions.hideGameField());
    dispatch(gameActions.hideGameControls());
  };

  const handleTryAgain = () => {
    dispatch(gameActions.hideGameControls());
    dispatch(settingsActions.setLastSettings());
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
