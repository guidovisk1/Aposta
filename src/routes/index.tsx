import React from 'react';
import Dashboard from '../pages/Dashboard';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/Auth/auth';

const Routes: React.FC = () => {
  const { signed } = useAuth();

  const privateRoutes = () => {
    return (
      <Dashboard>
        <AppRoutes />
      </Dashboard>
    );
  };

  const publicRoutes = () => {
    return <AuthRoutes />;
  };

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{signed ? privateRoutes() : publicRoutes()}</>;
};

export default Routes;
