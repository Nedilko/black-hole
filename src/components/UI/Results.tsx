import { getPresetName } from '../../store/presets';
import { MdOutlineTimer } from 'react-icons/md';
import { getTime } from '../../utils';
import { useAppSelector } from '../../hooks';
import { selectGame } from '../../store/selectors';

const Results = () => {
  const { difficulty, time, results } = useAppSelector(selectGame);
  const hightScore = results[difficulty];
  const greetingText = time <= hightScore ? 'New high score!' : 'You win!';
  return (
    <div className="flex flex-col text-3xl items-center text-gray-300/80 uppercase max-w-[400px] w-full">
      <div className="flex">{greetingText}</div>
      <div className="flex text-xl text-gray-300/60">{`(${getPresetName(
        difficulty
      )} mode)`}</div>
      <div className="flex flex-row border-t-2 border-b-2 border-gray-400/50 py-6 mt-20 items-center w-full">
        <div className="flex flex-2 order-2 text-5xl">
          <MdOutlineTimer />
        </div>
        <div className="flex flex-1 order-1 justify-start">
          <div className="flex flex-col items-center ml-10">
            <div className="flex text-xl text-gray-300/60">Score</div>
            <div className="flex">{getTime(time)}</div>
          </div>
        </div>
        <div className="flex flex-1 order-3 justify-end">
          <div className="flex flex-col items-center mr-10">
            <div className="flex text-xl text-gray-300/60">Best</div>
            <div className="flex">{getTime(hightScore)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
