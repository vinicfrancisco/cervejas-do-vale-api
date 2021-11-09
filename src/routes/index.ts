import { Router } from 'express';
import { ExpressAdapter } from 'ask-sdk-express-adapter';
import { SkillBuilders } from 'ask-sdk-core';
import alexaRoutes from './alexa';

const skillBuilder = SkillBuilders.custom();
const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, true, true);

const routes = Router();

routes.use('/alexa', alexaRoutes);

export default routes;
