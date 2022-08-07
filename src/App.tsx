import { useState } from 'react';
import GameField from './components/Game/GameField';
import Footer from './components/UI/Footer';
import Header from './components/UI/Header';
import SettingsDialog from './components/UI/SettingsDialog';
import { IBoardSize } from './game/field';

export interface ISettings {
  size: IBoardSize;
  holesCount: number;
}

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [settings, setSettings] = useState<ISettings>({
    size: { width: 8, height: 8 },
    holesCount: 7,
  });

  const handleStartGame = (settings: ISettings) => {
    setSettings(settings);
    console.log('game started wisth settings: ', settings);
    setIsStarted(true);
  };

  return (
    <div className="font-extralight flex flex-col min-h-screen overflow-x-scroll bg-gradient-to-b from-[#06070d] via-[#061234] to-[#0e103e]">
      <header className="flex justify-center">
        <Header />
      </header>
      <main className="flex flex-col mt-24 justify-center items-center">
        {!isStarted && <SettingsDialog onStartGame={handleStartGame} />}
        {isStarted && (
          <GameField size={settings.size} holesCount={settings.holesCount} />
        )}
      </main>
      <footer className="flex mt-auto justify-center">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
