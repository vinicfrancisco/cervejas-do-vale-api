import { Router, Request, Response } from 'express';
import { ExpressAdapter } from 'ask-sdk-express-adapter';
import * as Alexa from 'ask-sdk-core';

const skillBuilder = Alexa.SkillBuilders.custom();
const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, true, true);

const routes = Router();

routes.post(
  '/alexa',
  adapter.getRequestHandlers(),
  (req: Request, res: Response) => {
    return res.json({ hello: 'world' });
  },
);

export default routes;
