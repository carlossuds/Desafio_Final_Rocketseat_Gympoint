import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students';
import Plans from '../pages/Plans';
import Registrations from '../pages/Registrations';
import HelpOrders from '../pages/HelpOrders';
import StudentCreate from '../pages/StudentCreate';
import PlanCreate from '../pages/PlanCreate';
import RegistrationCreate from '../pages/RegistrationCreate';
import StudentEdit from '../pages/StudentEdit';
import PlanEdit from '../pages/PlanEdit';
import RegistrationEdit from '../pages/RegistrationEdit';

import teste from '../pages/teste';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/alunos" component={Students} isPrivate />
      <Route path="/planos" component={Plans} isPrivate />
      <Route path="/matriculas" component={Registrations} isPrivate />
      <Route path="/ajuda" component={HelpOrders} isPrivate />

      <Route path="/cadastro" component={StudentCreate} isPrivate />
      <Route path="/criarplano" component={PlanCreate} isPrivate />
      <Route path="/criarmatricula" component={RegistrationCreate} isPrivate />

      <Route path="/editaraluno" component={StudentEdit} isPrivate />
      <Route path="/editarplano" component={PlanEdit} isPrivate />
      <Route path="/editarmatricula" component={RegistrationEdit} isPrivate />

      <Route path="/teste" component={teste} isPrivate />
    </Switch>
  );
}
