import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './hooks/Auth';

import './app.css';
import Routes from './routes';

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  );
}

export default App;
