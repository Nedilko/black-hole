import { useState } from 'react';
import GameField from './components/Game/GameField';
import Footer from './components/UI/Footer';
import GameControls from './components/UI/GameControls';
import Header from './components/UI/Header';
import SettingsDialog from './components/UI/SettingsDialog';
import { IBoardSize } from './game/field';

export interface ISettings {
  size: IBoardSize;
  holesCount: number;
}

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [settings, setSettings] = useState<ISettings>({
    size: { width: 8, height: 8 },
    holesCount: 7,
  });

  const handleStartGame = (settings: ISettings) => {
    setSettings(settings);
    console.log('game started with settings: ', settings);
    setIsStarted(true);
  };

  const handleFinishGame = () => {
    console.log('game finished!');
    setIsFinished(true);
  };

  return (
    <div className="font-extralight bg-gradient-to-b from-[#06070d] via-[#061234] to-[#0e103e]">
      <div className="flex flex-col min-h-screen p-4 overflow-x-scroll">
        <header className="flex justify-center border-b-2 pb-4 border-gray-400/80">
          <Header cellsCount={10} openedCellsCount={10} timer={'00:12'} />
        </header>
        <main className="flex flex-col mt-24 justify-center items-center">
          {!isStarted && <SettingsDialog onStartGame={handleStartGame} />}
          {isStarted && (
            <GameField
              size={settings.size}
              holesCount={settings.holesCount}
              onFinish={handleFinishGame}
            />
          )}
        </main>
        <footer className="flex flex-col mt-auto justify-center items-center">
          <div className="flex mb-4">
            {isFinished && (
              <GameControls onTryAgain={() => {}} onMainMenu={() => {}} />
            )}
          </div>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default App;
