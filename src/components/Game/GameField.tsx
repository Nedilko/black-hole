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
        className={`grid gap-2 grid-cols-[_repeat(${width},_1fr)] grid-rows-[_repeat(${height},_1fr)]`}
      >
        {Array.from({ length: count }, (_, i) => (
          <Cell key={i} index={i} />
        ))}
      </div>
    </div>
  );
};

export default GameField;
