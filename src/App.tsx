import GameField from './components/Game/GameField';
import Footer from './components/UI/Footer';
import Header from './components/UI/Header';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-center">
        <Header />
      </header>
      <main className="flex mt-24 justify-center">
        <GameField width={10} height={10} />
      </main>
      <footer className="flex mt-auto justify-center">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
