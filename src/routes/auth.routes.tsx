import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Recover from '../pages/Recover';
import RecoverPassword from '../pages/RecoverPassword';

const AuthRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/recuperar-senha" component={Recover} />
      <Route exact path="/user/resetpassword/:id" component={RecoverPassword} />
      <Route path="*" exact render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default AuthRoutes;
