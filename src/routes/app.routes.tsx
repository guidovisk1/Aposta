import React from 'react';
import { Redirect, Switch, Route as RouterDom } from 'react-router-dom';

import Route from './components/Route';

import Users from '../pages/Users';
import UsersGroup from '../pages/UsersGroup';
import Equipments from '../pages/Equipments';
import Tools from '../pages/Tools';
import EPIs from '../pages/EPIs';
import Trainings from '../pages/Trainings';

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
      <Route isPrivate exact path="/dashboard/epis" component={EPIs} />
      <Route
        isPrivate
        exact
        path="/dashboard/treinamentos"
        component={Trainings}
      />
      <RouterDom path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default AppRoutes;
