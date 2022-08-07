import { useState } from 'react';
import { ISettings } from '../../App';
import { IBoardSize } from '../../game/field';
import { getSize } from '../../game/helpers';
import { NumberInput } from './NumberInput';

type PropsType = {
  onStartGame: (settings: ISettings) => void;
};

const SettingsDialog = ({ onStartGame }: PropsType) => {
  const handleApply = () => {
    console.log('apply');
    onStartGame({
      size,
      holesCount,
    });
  };

  const [size, setSize] = useState<IBoardSize>({ width: 8, height: 8 });
  const [holesCount, setHolesCount] = useState<number>(7);

  const handleChangeWidth = (value: number) => {
    setSize({ ...size, width: value });
  };

  const handleChangeHeight = (value: number) => {
    setSize({ ...size, height: value });
  };

  const handleChangeHolesCount = (value: number) => {
    setHolesCount(value);
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl text-gray-300/80 uppercase mb-4">Settings</h2>
        <div className="flex flex-row mt-4 gap-x-6">
          <NumberInput
            label="Width:"
            value={size.width}
            min={2}
            max={20}
            handleChange={handleChangeWidth}
          />
          <NumberInput
            label="Height:"
            min={2}
            max={20}
            value={size.height}
            handleChange={handleChangeHeight}
          />
        </div>
        <div className="flex mt-4">
          <NumberInput
            label="Holes count:"
            min={1}
            max={getSize(size) - 1}
            value={holesCount}
            handleChange={handleChangeHolesCount}
          />
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <button
          className="pb-1 text-5xl text-gray-300/80 uppercase hover:text-shadow hover:text-gray-300 transition-all duration-150"
          onClick={handleApply}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default SettingsDialog;
