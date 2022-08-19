import Cell from './Cell';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import type { GameCell } from '../../store/actions/field';

const GameField = () => {
  const { width, height } = useSelector((state: RootState) => state.field.size);

  const cells = useSelector((state: RootState) => state.field.cells);

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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameField;
