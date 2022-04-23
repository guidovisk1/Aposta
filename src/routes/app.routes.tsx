import React from 'react';
import { Redirect, Switch, Route as RouterDom } from 'react-router-dom';

import Route from './components/Route';

import Users from '../pages/Users';
import UsersGroup from '../pages/UsersGroup';
import Equipments from '../pages/Equipments';
import Tools from '../pages/Tools';

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route isPrivate exact path="/dashboard/users" component={Users} />
      <Route
        isPrivate
        exact
        path="/dashboard/grupo-usuario"
        component={UsersGroup}
      />
      <Route
        isPrivate
        exact
        path="/dashboard/equipamentos"
        component={Equipments}
      />
      <Route isPrivate exact path="/dashboard/ferramentas" component={Tools} />
      <RouterDom path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default AppRoutes;
