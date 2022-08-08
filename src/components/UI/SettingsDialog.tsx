import { useState } from 'react';
import { ISettings } from '../../App';
import NumberInput from './NumberInput';

type PropsType = {
  onStartGame: (settings: ISettings) => void;
  settings: ISettings;
};

const SettingsDialog = ({ onStartGame, settings }: PropsType) => {
  const handleApply = () => {
    console.log('apply');
    onStartGame({
      size: {
        width,
        height,
      },
      holesCount,
    });
  };

  const [width, setWidth] = useState<number>(settings.size.width);
  const [height, setHeight] = useState<number>(settings.size.height);
  const [holesCount, setHolesCount] = useState<number>(settings.holesCount);

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
            handleChange={setWidth}
          />
          <NumberInput
            label="Height:"
            min={2}
            max={20}
            value={height}
            handleChange={setHeight}
          />
        </div>
        <div className="flex mt-4">
          <NumberInput
            label="Holes count:"
            min={1}
            max={width * height - 2}
            value={holesCount}
            handleChange={setHolesCount}
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
