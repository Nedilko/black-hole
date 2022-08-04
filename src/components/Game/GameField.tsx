import { useMemo } from 'react';
import Cell from './Cell';

type GameFieldProps = {
  width: number;
  height: number;
};

const fillIndexes = (size: number, minesCount: number): number[] => {
  const randIndexes: number[] = [];
  while (randIndexes.length < minesCount) {
    const index = Math.floor(Math.random() * size);
    if (!randIndexes.includes(index)) {
      randIndexes.push(index);
    }
  }
  return randIndexes;
};

const GameField = ({ width, height }: GameFieldProps) => {
  const count = width * height;
  const indexes = useMemo(() => fillIndexes(count, 10), [count]);

  return (
    <div className="flex flex-col min-w-[550px]">
      <div className={`grid gap-2 grid-cols-${width} grid-rows-${height}`}>
        {Array.from({ length: count }, (_, i) => (
          <Cell key={i} index={i} isMine={indexes.includes(i)} />
        ))}
      </div>
    </div>
  );
};

export default GameField;
