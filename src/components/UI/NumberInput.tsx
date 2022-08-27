import React, { memo, useCallback, useEffect, useRef } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

type PropsType = {
  label: string;
  min: number;
  max: number;
  value: number;
  handleChange: (value: number) => void;
};

const NumberInput = ({ label, min, max, value, handleChange }: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ignoreScroll = (e: WheelEvent) => {
      e.preventDefault();
    };
    inputRef.current &&
      inputRef.current.addEventListener('wheel', ignoreScroll);
  }, [inputRef]);

  const changeValueHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(+e.target.value);
    },
    [handleChange]
  );

  const handleIncrement = useCallback(() => {
    handleChange(value + 1);
  }, [handleChange, value]);

  const handleDecrement = useCallback(() => {
    handleChange(value - 1);
  }, [handleChange, value]);

  return (
    <label className="flex text-gray-300 uppercase relative w-full">
      <MdKeyboardArrowUp
        data-testid="increment"
        onClick={handleIncrement}
        className="absolute top-0 right-0 cursor-pointer text-3xl hover:scale-110 transition-all duration-150"
      />
      <MdKeyboardArrowDown
        data-testid="decrement"
        onClick={handleDecrement}
        className="absolute bottom-0 right-0 cursor-pointer text-3xl hover:scale-110 transition-all duration-150"
      />
      <div className="text-sm absolute top-1 left-2 text-gray-400 select-none">
        {label}
      </div>
      <input
        className="appearance-none outline outline-1 hover:outline-2 outline-slate-700 focus:outline-gray-400 outline-offset-2 w-full text-xl font-semibold bg-slate-900 px-2 pt-6 pb-1 rounded transition-all duration-150"
        type="number"
        min={min}
        max={max}
        onChange={changeValueHandler}
        value={value}
        ref={inputRef}
      />
    </label>
  );
};

export default memo(NumberInput);
