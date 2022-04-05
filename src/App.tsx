import './app.css';

import Button from './components/Button';

function App() {
  return (
    <div>
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>Oi</p>
        <Button>Adicionar</Button>
        <Button secondary>Voltar</Button>
        <Button disabled>Voltar</Button>
      </header>
    </div>
  );
}

export default App;
