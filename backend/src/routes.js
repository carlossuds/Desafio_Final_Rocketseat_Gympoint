import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpController from './app/controllers/HelpController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/users', UserController.index);

routes.post('/students/:student_id/checkin', CheckinController.store);
routes.get('/students/:student_id/checkin', CheckinController.index);

routes.post('/students/:student_id/help-orders', HelpController.store);

// ROTAS QUE REQUEREM AUTENTICAÇÃO
routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.put('/students/:_id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:_id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/registration', RegistrationController.store);
routes.get('/registration', RegistrationController.index);
routes.put('/registration/:_id', RegistrationController.update);
routes.delete('/registration/:id', RegistrationController.delete);

routes.get('/help-orders/:id', HelpController.index);
routes.put('/help-orders/:id', HelpController.update);
export default routes;
