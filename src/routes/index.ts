import { Router } from 'express';
import alexaVerifier from 'alexa-verifier-middleware';
import alexaRoutes from './alexa';

const routes = Router();

alexaRoutes.use(alexaVerifier);

routes.use('/alexa', alexaRoutes);

export default routes;
