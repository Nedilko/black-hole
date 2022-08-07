import Cell from './Cell';
import type { IBoardSize } from '../../game/field';
import { useGameBoard } from '../../hooks/useGameBoard';
import { getSize } from '../../game/helpers';

type PropsType = {
  size: IBoardSize;
  holesCount: number;
  onFinish: () => void;
  onOpenCell: () => void;
};

const GameField = ({ size, holesCount, onFinish, onOpenCell }: PropsType) => {
  const handleOpenCell = () => {
    onOpenCell();
  };
  const [board, openedCellCount] = useGameBoard(
    size,
    holesCount,
    onFinish,
    handleOpenCell
  );
  const { width, height } = size;

  return (
    <div className="flex flex-col">
      <div className="flex text-white hover:underline">
        {getSize(size) - holesCount - openedCellCount}
      </div>
      <div className="flex flex-col">
        <div
          className={`grid gap-2 grid-cols-${width} grid-rows-${height} p-4`}
        >
          {Array.from({ length: getSize(size) }, (_, i) => {
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
};;

export default GameField;
