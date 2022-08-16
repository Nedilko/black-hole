import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { startGame } from '../../store/actions/game';
import NumberInput from './NumberInput';

const SettingsDialog = () => {
  const dispatch = useDispatch();
  const currentSize = useSelector((state: RootState) => state.field.size);
  const currentHolesCount = useSelector(
    (state: RootState) => state.field.holesCount
  );

  const handleStartGame = () => {
    dispatch(startGame({ width, height }, holesCount));
  };

  const [width, setWidth] = useState<number>(currentSize.width);
  const [height, setHeight] = useState<number>(currentSize.height);
  const [holesCount, setHolesCount] = useState<number>(currentHolesCount);

  const handleChangeWidth = (value: number) => {
    if (value > 4 && value <= 20) {
      setWidth(value);
    }
  };

  const handleChangeHeight = (value: number) => {
    if (value > 4 && value <= 20) {
      setHeight(value);
    }
  };

  const handleChangeHolesCount = (value: number) => {
    if (value < width * height - 1 && value > 0) {
      setHolesCount(value);
    }
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl text-gray-300/80 uppercase mb-4">Settings</h2>
        <div className="flex flex-row mt-4 gap-x-6">
          <NumberInput
            label="Width:"
            value={width}
            min={2}
            max={20}
            handleChange={handleChangeWidth}
          />
          <NumberInput
            label="Height:"
            min={2}
            max={20}
            value={height}
            handleChange={handleChangeHeight}
          />
        </div>
        <div className="flex mt-4">
          <NumberInput
            label="Holes count:"
            min={1}
            max={width * height - 2}
            value={holesCount}
            handleChange={handleChangeHolesCount}
          />
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <button
          className="pb-1 text-5xl text-gray-300/80 uppercase hover:text-shadow hover:text-gray-300 transition-all duration-150"
          onClick={handleStartGame}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default SettingsDialog;
