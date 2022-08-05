import { useCallback, useState } from 'react';
import { getGameCellsData } from '../../game/field';
import Cell from './Cell';
import type { IBoardSize } from '../../game/field';

const GameField = ({ width, height }: IBoardSize) => {
  const count = width * height;

  const [cells, setCells] = useState(() =>
    getGameCellsData({ width, height }, 10)
  );

  const handleOpen = useCallback((index: number, isMark: boolean) => {
    setCells((current) => {
      current[index].isOpen = true;
      return [...current];
    });
  }, []);

  const handleOpenAllCells = useCallback(() => {
    setCells((current) => {
      return current.map((cell) => ({ ...cell, isOpen: true }));
    });
  }, []);

  const handleOpenAllHoles = useCallback(() => {
    setCells((current) => {
      return current.map((cell) => ({ ...cell, isOpen: cell.isHole }));
    });
  }, []);

  return (
    <div className="flex flex-col">
      <button onClick={handleOpenAllCells}>open all</button>
      <button onClick={handleOpenAllHoles}>open all holes</button>
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
