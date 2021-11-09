import { Router } from 'express';
import alexaRoutes from './alexa';

const routes = Router();

routes.use('/alexa', alexaRoutes);

export default routes;
