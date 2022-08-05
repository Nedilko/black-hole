import { useCallback, useState } from 'react';
import { getGameCellsData, fillNumbers } from '../../game/field';
import Cell from './Cell';
import type { IBoardSize } from '../../game/field';

const GameField = ({ width, height }: IBoardSize) => {
  const count = width * height;

  const [cells, setCells] = useState(() =>
    fillNumbers(getGameCellsData({ width, height }, 10))
  );

  const handleOpen = useCallback((index: number, isMark: boolean) => {
    setCells((current) => {
      current[index].isOpen = true;
      return [...current];
    });
  }, []);

  return (
    <div className="flex flex-col">
      <div className={`grid gap-2 grid-cols-${width} grid-rows-${height} p-4`}>
        {Array.from({ length: count }, (_, i) => {
          return (
            <Cell
              key={i}
              index={i}
              isHole={cells[i].isHole}
              holesNearCount={cells[i].holesNearCount}
              isOpen={cells[i].isOpen}
              onOpen={handleOpen}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GameField;
