import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Login from '../pages/Login';

const AuthRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="*" exact render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default AuthRoutes;
