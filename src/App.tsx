import { useState } from 'react';
import GameField from './components/Game/GameField';
import Footer from './components/UI/Footer';
import Header from './components/UI/Header';
import { NumberInput } from './components/UI/NumberInput';
import { IBoardSize } from './game/field';
import { getSize } from './game/helpers';

function App() {
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
    <div className="font-extralight flex flex-col min-h-screen overflow-x-scroll bg-gradient-to-b from-[#06070d] via-[#061234] to-[#0e103e]">
      <header className="flex justify-center">
        <Header />
      </header>
      <main className="flex flex-col mt-24 justify-center items-center">
        <div className="flex mt-4 ">
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
            value={size.height}
            handleChange={handleChangeHolesCount}
          />
        </div>
        <GameField size={size} holesCount={holesCount} />
      </main>
      <footer className="flex mt-auto justify-center">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
