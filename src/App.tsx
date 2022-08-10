import GameField from './components/Game/GameField';
import Footer from './components/UI/Footer';
import GameControls from './components/UI/GameControls';
import Header from './components/UI/Header';
import SettingsDialog from './components/UI/SettingsDialog';

import { useSelector } from 'react-redux';

function App() {
  const { showGameField, showGameControls } = useSelector(
    (state: any) => state.game
  );

  return (
    <div className="font-extralight bg-gradient-to-b from-[#06070d] via-[#061234] to-[#0e103e]">
      <div className="flex flex-col min-h-screen p-4 overflow-x-scroll">
        <header className="flex justify-center border-b-2 pb-4 border-gray-400/50">
          <Header />
        </header>
        <main className="flex flex-col mt-24 justify-center items-center">
          {!showGameField && <SettingsDialog />}
          {showGameField && <GameField />}
        </main>
        <footer className="flex flex-col mt-auto justify-center items-center">
          <div className="flex mb-4">
            {showGameControls && <GameControls />}
          </div>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default App;
