import { Router } from 'express';
import alexaRoutes from './alexa';
import usersRouter from './User/user.routes';
import profileRouter from './User/profile.routes';
import sessionRouter from './User/sessions.routes';
import beersRouter from './Beer/beers.routes';

const routes = Router();

routes.use('/signin', sessionRouter);

routes.use('/alexa', alexaRoutes);

routes.use('/users', usersRouter);
routes.use('/beers', beersRouter);
routes.use('/profile', profileRouter);

export default routes;
