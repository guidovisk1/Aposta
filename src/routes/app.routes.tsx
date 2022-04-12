import React from 'react';
import { Redirect, Switch, Route as RouterDom } from 'react-router-dom';

import Route from './components/Route';

import Users from '../pages/Users';

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route isPrivate exact path="/dashboard/users" component={Users} />
      <Route
        isPrivate
        exact
        path="/dashboard/grupo-usuario"
        component={Users}
      />
      <RouterDom path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default AppRoutes;
