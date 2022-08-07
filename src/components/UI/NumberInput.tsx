type PropsType = {
  label: string;
  min: number;
  max: number;
  value: number;
  handleChange: (value: number) => void;
};

export const NumberInput = ({
  label,
  min,
  max,
  value,
  handleChange,
}: PropsType) => {
  const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(+e.target.value);
  };
  return (
    <label className="mx-2 text-3xl text-gray-300 uppercase">
      {label}
      <input
        className="ml-2 text-2xl text-gray-300 font-semibold bg-slate-900 border rounded border-none pl-2 active:border-blue-400"
        type="number"
        min={min}
        max={max}
        onChange={changeValueHandler}
        value={value}
      />
    </label>
  );
};
