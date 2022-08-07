type PropsTyle = {
  onTryAgain: () => void;
  onMainMenu: () => void;
};

const GameControls = ({ onTryAgain, onMainMenu }: PropsTyle) => {
  return (
    <div className="flex flex-row gap-x-8 upppercase">
      <button className="flex text-3xl text-gray-300/80 uppercase hover:text-shadow hover:text-gray-300 transition-all duration-150">
        try again
      </button>
      <button className="flex text-3xl text-gray-300/80 uppercase hover:text-shadow hover:text-gray-300 transition-all duration-150">
        main menu
      </button>
    </div>
  );
};

export default GameControls;
