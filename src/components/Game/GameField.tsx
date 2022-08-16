import Cell from './Cell';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { fieldActions, openCell } from '../../store/actions/field';
import type { GameCell } from '../../store/actions/field';

const GameField = () => {
  const dispatch = useAppDispatch();

  const { width, height } = useSelector((state: RootState) => state.field.size);

  const cells = useSelector((state: RootState) => state.field.cells);

  const handleOpenCell = useCallback(
    (cellIndex: number) => {
      dispatch(openCell(cellIndex));
    },
    [dispatch]
  );

  const handleMarkCell = useCallback(
    (cellIndex: number) => {
      dispatch(fieldActions.toggleMarkCell(cellIndex));
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div
          className={`grid gap-2 grid-cols-${width} grid-rows-${height} p-4`}
        >
          {cells.map((cell: GameCell) => {
            const { index, isHole, holesNearCount, isOpen, isMarked } = cell;
            return (
              <Cell
                key={index}
                index={index}
                isOpen={isOpen}
                isHole={isHole}
                isMarked={isMarked}
                holesNearCount={holesNearCount}
                handleOpen={handleOpenCell}
                handleMarkCell={handleMarkCell}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};;

export default GameField;
