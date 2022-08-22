import Cell from './Cell';
import type { FieldCell } from '../../store/fieldSlice';
import { memo } from 'react';
import { useAppSelector } from '../../hooks';
import { selectFieldCells, selectFieldSize } from '../../store/selectors';

const GameField = () => {
  const { width, height } = useAppSelector(selectFieldSize);
  const cells = useAppSelector(selectFieldCells);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div
          className={`grid gap-2 grid-cols-${width} grid-rows-${height} p-4`}
        >
          {cells.map((cell: FieldCell) => {
            const { index, isHole, holesNearCount, isOpen, isMarked } = cell;
            return (
              <Cell
                key={index}
                index={index}
                isOpen={isOpen}
                isHole={isHole}
                isMarked={isMarked}
                holesNearCount={holesNearCount}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(GameField);
