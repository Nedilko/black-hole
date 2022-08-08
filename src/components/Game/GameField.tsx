import Cell from './Cell';
import { useGameBoard } from '../../hooks/useGameBoard';
import { useSettingsStore } from '../../hooks/useSettingsStore';
import { useGameStore } from '../../hooks/useGameStore';
import { GameActions } from '../../store/GameStore';
import { useEffect } from 'react';

const GameField = () => {
  const [{ size, holesCount }, settingsDispatch] = useSettingsStore();
  const [_, gameDispatch] = useGameStore();
  const handleOpenCell = () => {
    // console.log('cell opened');
  };

  const onFinishGame = () => {
    gameDispatch(GameActions.showGameControls());
  };

  const [board, remainingCellsCount] = useGameBoard(
    size,
    holesCount,
    onFinishGame,
    handleOpenCell
  );
  const { width, height } = size;
  useEffect(() => {
    gameDispatch(GameActions.updateRemainingCellsCount(remainingCellsCount));
  }, [remainingCellsCount, gameDispatch]);

  useEffect(() => {
    gameDispatch(
      GameActions.updateTotalCellsCount(size.width * size.height - holesCount)
    );
  }, [gameDispatch, size.height, size.width, holesCount]);

  return (
    <div className="flex flex-col">
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
