import Cell from './Cell';
import { useGameBoard } from '../../hooks/useGameBoard';
import { useSettingsStore } from '../../hooks/useSettingsStore';
import { useGameStore } from '../../hooks/useGameStore';
import { GameActions } from '../../store/GameStore';

const GameField = () => {
  const [{ size, holesCount }, settingsDispatch] = useSettingsStore();
  const [_, gameDispatch] = useGameStore();
  const handleOpenCell = () => {
    console.log('cell opened');
  };

  const onFinishGame = () => {
    console.log('GameField: onFinishGame');
    gameDispatch(GameActions.showGameControls());
  };

  const [board, remainingCellsCount] = useGameBoard(
    size,
    holesCount,
    onFinishGame,
    handleOpenCell
  );
  const { width, height } = size;

  return (
    <div className="flex flex-col">
      <div className="flex text-white hover:underline">
        {remainingCellsCount}
      </div>
      <div className="flex flex-col">
        <div
          className={`grid gap-2 grid-cols-${width} grid-rows-${height} p-4`}
        >
          {Array.from({ length: width * height }, (_, i) => {
            const { isHole, holesNearCount, isOpen, handleOpen } =
              board.cells[i];
            return (
              <Cell
                key={i}
                isOpen={isOpen}
                isHole={isHole}
                holesNearCount={holesNearCount}
                handleOpen={handleOpen}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameField;
