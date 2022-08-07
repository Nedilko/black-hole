type PropsType = {
  cellsCount: number;
  openedCellsCount: number;
  timer: string;
};

const Header = ({ cellsCount, openedCellsCount, timer }: PropsType) => {
  return (
    <div className="flex justify-between w-full items-center text-5xl text-gray-300/80 uppercase text-shadow">
      <div className="py-21 flex text-lg">{`${cellsCount} / ${openedCellsCount}`}</div>
      <div className="flex">find black holes</div>
      <div className="flex text-lg">{timer}</div>
    </div>
  );
};

export default Header;
