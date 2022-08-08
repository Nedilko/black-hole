import GameField from './components/Game/GameField';
import Footer from './components/UI/Footer';
import GameControls from './components/UI/GameControls';
import Header from './components/UI/Header';
import SettingsDialog from './components/UI/SettingsDialog';
import { useGameStore } from './hooks/useGameStore';
import { useSettingsStore } from './hooks/useSettingsStore';
import { ISettings, SettingsActions } from './store/SettingsStore';
import { GameActions } from './store/GameStore';

function App() {
  const [{ showGameField, showGameControls }, gameDispatch] = useGameStore();
  const [settings, settingsDispatch] = useSettingsStore();

  const handleStartGame = (settings: ISettings) => {
    settingsDispatch(SettingsActions.setSettings(settings));
    console.log('game started with settings: ', settings);
    gameDispatch(GameActions.showGameField());
  };

  const handleTryAgain = () => {
    console.log('try again');
    gameDispatch(GameActions.hideGameControls());
    settingsDispatch(SettingsActions.setSettings(settings));
  };

  const handleBackToMenu = () => {
    console.log('back to menu');
    gameDispatch(GameActions.hideGameField());
    gameDispatch(GameActions.hideGameControls());
  };

  console.log('app rendered');

  return (
    <div className="font-extralight bg-gradient-to-b from-[#06070d] via-[#061234] to-[#0e103e]">
      <div className="flex flex-col min-h-screen p-4 overflow-x-scroll">
        <header className="flex justify-center border-b-2 pb-4 border-gray-400/50">
          <Header cellsCount={10} openedCellsCount={10} timer={'00:12'} />
        </header>
        <main className="flex flex-col mt-24 justify-center items-center">
          {!showGameField && (
            <SettingsDialog settings={settings} onStartGame={handleStartGame} />
          )}
          {showGameField && <GameField />}
        </main>
        <footer className="flex flex-col mt-auto justify-center items-center">
          <div className="flex mb-4">
            {showGameControls && (
              <GameControls
                onTryAgain={handleTryAgain}
                onMainMenu={handleBackToMenu}
              />
            )}
          </div>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default App;
