import { useCallback, useEffect, useRef } from 'react';

interface GameFieldProps {
  width: number;
  height: number;
}

type Coordinates = {
  x: number;
  y: number;
};

const GameField = ({ width, height }: GameFieldProps) => {
  const gameField = useRef<HTMLCanvasElement>(null);

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      console.log(coordinates);
    }
  }, []);

  const getCoordinates = (event: MouseEvent): Coordinates | undefined => {
    if (!gameField.current) {
      return;
    }

    const canvas: HTMLCanvasElement = gameField.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  useEffect(() => {
    if (!gameField.current) {
      return;
    }
    const canvas: HTMLCanvasElement = gameField.current;
    canvas.addEventListener('mousedown', startPaint);
    return () => {
      canvas.removeEventListener('mousedown', startPaint);
    };
  }, [startPaint]);

  return (
    <div className="border border-red-500">
      <canvas
        ref={gameField}
        id="gameField"
        width={width}
        height={height}
      ></canvas>
    </div>
  );
};

export default GameField;
