import { memo } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { DIFFUCULTY } from '../../store/gameSlice';
import { getPresetName } from '../../store/presets';

type PropsType = {
  value: DIFFUCULTY;
  handleChange: (value: DIFFUCULTY) => void;
};

const PresetsDropdown = ({ value, handleChange }: PropsType) => {
  const changeValueHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(+e.target.value as DIFFUCULTY);
  };

  return (
    <label className="flex text-gray-300 uppercase relative w-full">
      <MdKeyboardArrowDown className="absolute translate-y-1/2 right-0 cursor-pointer text-3xl pointer-events-none" />
      <div className="text-sm absolute top-1 left-2 text-gray-400">
        difficulty
      </div>
      <select
        name="presets"
        id="presets"
        className="appearance-none outline outline-1 hover:outline-2 outline-slate-700 focus:outline-gray-400 outline-offset-2 w-full text-xl font-normal bg-slate-900 px-2 pt-6 pb-1 rounded transition-all duration-150 hover:cursor-pointer"
        onChange={changeValueHandler}
        value={value}
      >
        <option value={DIFFUCULTY.EASY}>
          {getPresetName(DIFFUCULTY.EASY)}
        </option>
        <option value={DIFFUCULTY.MEDIUM}>
          {getPresetName(DIFFUCULTY.MEDIUM)}
        </option>
        <option value={DIFFUCULTY.HARD}>
          {getPresetName(DIFFUCULTY.HARD)}
        </option>
        <option value={DIFFUCULTY.CUSTOM}>
          {getPresetName(DIFFUCULTY.CUSTOM)}
        </option>
      </select>
    </label>
  );
};

export default memo(PresetsDropdown);
