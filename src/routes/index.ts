import express, { Router } from 'express';
import alexaVerifier from 'alexa-verifier-middleware';
import alexaRoutes from './alexa';

const routes = Router();

routes.use('/alexa', alexaRoutes);

alexaRoutes.use(alexaVerifier);
alexaRoutes.use(express.json());

export default routes;
