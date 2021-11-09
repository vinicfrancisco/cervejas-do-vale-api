import express, { Router } from 'express';
import alexaVerifier from 'alexa-verifier-middleware';
import alexaRoutes from './alexa';

const routes = Router();

alexaRoutes.use(alexaVerifier);
alexaRoutes.use(express.json());

routes.use('/alexa', alexaRoutes);

export default routes;
