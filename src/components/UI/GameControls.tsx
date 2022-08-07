import { MdReplay, MdOutlineArrowUpward } from 'react-icons/md';

type PropsTyle = {
  onTryAgain: () => void;
  onMainMenu: () => void;
};

const GameControls = ({ onTryAgain, onMainMenu }: PropsTyle) => {
  return (
    <div className="flex flex-row gap-x-8 upppercase">
      <button
        onClick={onTryAgain}
        className="flex text-3xl items-center text-gray-300/80 uppercase hover:text-shadow hover:text-gray-300 transition-all duration-150"
      >
        <MdReplay />
        try again
      </button>
      <button
        onClick={onMainMenu}
        className="flex text-3xl items-center text-gray-300/80 uppercase hover:text-shadow hover:text-gray-300 transition-all duration-150"
      >
        main menu
        <MdOutlineArrowUpward />
      </button>
    </div>
  );
};

export default GameControls;
