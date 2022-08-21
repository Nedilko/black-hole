import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { DIFFUCULTY, startGame } from '../../store/actions/game';
import { PRESET } from '../../store/presets';
import NumberInput from './NumberInput';
import PresetsDropdown from './PresetsDropdown';

const SettingsDialog = () => {
  const dispatch = useDispatch();
  const { difficulty } = useSelector((state: RootState) => state.game);
  const { size: currentSize, holesCount: currentHolesCount } = useSelector(
    (state: RootState) => state.field
  );

  const handleStartGame = () => {
    dispatch(startGame({ width, height }, holesCount));
  };

  const [width, setWidth] = useState<number>(currentSize.width);
  const [height, setHeight] = useState<number>(currentSize.height);
  const [holesCount, setHolesCount] = useState<number>(currentHolesCount);
  const [difficultyValue, setDifficultyValue] =
    useState<DIFFUCULTY>(difficulty);

  const handlePresetChange = useCallback((presetValue: DIFFUCULTY) => {
    if (presetValue !== DIFFUCULTY.CUSTOM) {
      const preset = PRESET[presetValue];
      const { width, height } = preset.size;
      const { holesCount } = preset;
      setWidth(width);
      setHeight(height);
      setHolesCount(holesCount);
    }
    setDifficultyValue(presetValue);
  }, []);

  const handleChangeWidth = useCallback((value: number) => {
    if (value > 4 && value <= 20) {
      setWidth(value);
    }
  }, []);

  const handleChangeHeight = useCallback((value: number) => {
    if (value > 4 && value <= 20) {
      setHeight(value);
    }
  }, []);

  const handleChangeHolesCount = useCallback(
    (value: number) => {
      if (value < width * height - 1 && value > 0) {
        setHolesCount(value);
      }
    },
    [height, width]
  );

  useEffect(() => {
    const preset = Object.entries(PRESET).find(([key, preset]) => {
      return (
        preset.size.width === width &&
        preset.size.height === height &&
        preset.holesCount === holesCount
      );
    });
    if (preset) {
      setDifficultyValue(+preset[0] as DIFFUCULTY);
    } else {
      setDifficultyValue(DIFFUCULTY.CUSTOM);
    }
  }, [width, height, holesCount, handlePresetChange]);

  return (
    <div className="flex flex-col p-4 w-full max-w-[400px]">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row mt-4 gap-x-6 w-full">
          <PresetsDropdown
            value={difficultyValue}
            handleChange={handlePresetChange}
          />
        </div>
        <div className="flex flex-row mt-4 gap-x-6 w-full">
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
        <div className="flex mt-4 w-full">
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
