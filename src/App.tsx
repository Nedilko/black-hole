import GameField from './components/Game/GameField';
import Footer from './components/UI/Footer';
import GameControls from './components/UI/GameControls';
import Header from './components/UI/Header';
import SettingsDialog from './components/UI/SettingsDialog';

import { useSelector } from 'react-redux';
import type { RootState } from './store';
import Results from './components/UI/Results';

function App() {
  const { showGameField, showGameControls, showSettings, isWon } = useSelector(
    (state: RootState) => state.game
  );

  return (
    <div className="font-extralight bg-gradient-to-b from-[#06070d] via-[#061234] to-[#0e103e]">
      <div className="flex flex-col min-h-screen p-4 overflow-x-scroll">
        <header>
          <Header />
        </header>
        <main className="flex flex-col mt-24 justify-center items-center">
          {showSettings && <SettingsDialog />}
          {isWon && <Results />}
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
