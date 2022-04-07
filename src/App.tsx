import AppProvider from './hooks/Auth';

import './app.css';

import Login from './pages/Login';

function App() {
  return (
    <div>
      <AppProvider>
        <Login />
      </AppProvider>
    </div>
  );
}

export default App;
