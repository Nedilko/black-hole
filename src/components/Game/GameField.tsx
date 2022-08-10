import Cell from './Cell';
import { useGameBoard } from '../../hooks/useGameBoard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gameActions } from '../../store/actions/game';

const GameField = () => {
  const dispatch = useDispatch();

  const { size, holesCount } = useSelector((state: any) => state.settings);
  const handleOpenCell = () => {
    // console.log('cell opened');
  };

  const onFinishGame = () => {
    dispatch(gameActions.showGameControls());
  };

  const [board, remainingCellsCount] = useGameBoard(
    size,
    holesCount,
    onFinishGame,
    handleOpenCell
  );
  const { width, height } = size;
  useEffect(() => {
    dispatch(gameActions.updateRemainingCellsCount(remainingCellsCount));
  }, [remainingCellsCount, dispatch]);

  useEffect(() => {
    dispatch(
      gameActions.updateTotalCellsCount(size.width * size.height - holesCount)
    );
  }, [dispatch, size.height, size.width, holesCount]);

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
