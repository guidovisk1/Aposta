import React from 'react';
import { Redirect, Switch, Route as RouterDom } from 'react-router-dom';

import Route from './components/Route';

import Users from '../pages/Users';
import UsersGroup from '../pages/UsersGroup';
import Equipments from '../pages/Equipments';
import Tools from '../pages/Tools';
import EPIs from '../pages/EPIs';
import Trainings from '../pages/Trainings';
import Operations from '../pages/Operations';
import MaintananceRequests from '../pages/MaintananceRequests';
import MaintananceRequestList from '../pages/MaintananceRequestList';
import RequestsApproval from '../pages/RequestsApproval';

const AppRoutes: React.FC = () => {
  return (
    <Switch>
    
    
      
      <Route
        isPrivate
        exact
        path="/dashboard/operacoes"
        component={Operations}
      />
      
     
      <RouterDom path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default AppRoutes;
