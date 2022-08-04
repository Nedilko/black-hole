import { useState } from 'react';
import Cell from './Cell';

interface GameFieldProps {
  width: number;
  height: number;
}

type Coordinates = {
  x: number;
  y: number;
};

const GameField = ({ width, height }: GameFieldProps) => {
  const count = width * height;
  const [cells, setCells] = useState<Array<boolean>>(Array(count).fill(false));
  const ww = `repeat(${width},_1fr)`;
  const hh = `repeat(${height},_1fr)`;
  const gridCols = `grid-cols-[${ww}]`;
  const gridRows = `grid-rows-[${hh}]`;

  return (
    <div className="flex flex-col">
      <button
        onClick={() => {
          setCells([]);
          console.log(cells);
        }}
      >
        click me
      </button>
      <div
        // className={`grid gap-2 grid-cols-[_repeat(${width},_1fr)] grid-rows-[_repeat(${height},_1fr)]`}
        // className={`grid gap-2 ${gridCols} ${gridRows}`}
        className={`grid gap-2 grid-cols-${width} grid-rows-${height}`}
      >
        {Array.from({ length: count }, (_, i) => (
          <Cell key={i} index={i} />
        ))}
      </div>
    </div>
  );
};

export default GameField;
