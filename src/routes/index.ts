import { Router } from 'express';
import alexaRoutes from './alexa';

const routes = Router();

routes.use(alexaRoutes);

export default routes;
