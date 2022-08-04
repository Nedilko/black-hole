import { useState } from 'react';
import Cell from './Cell';

interface GameFieldProps {
  width: number;
  height: number;
}

const GameField = ({ width, height }: GameFieldProps) => {
  const count = width * height;
  const [cells, setCells] = useState<Array<boolean>>(Array(count).fill(false));

  return (
    <div className="flex flex-col min-w-[550px]">
      <button
        onClick={() => {
          setCells([]);
          console.log(cells);
        }}
      >
        click me
      </button>
      <div className={`grid gap-2 grid-cols-${width} grid-rows-${height}`}>
        {Array.from({ length: count }, (_, i) => (
          <Cell key={i} index={i} />
        ))}
      </div>
    </div>
  );
};

export default GameField;
