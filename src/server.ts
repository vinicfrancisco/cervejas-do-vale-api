// import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

import AppError from '@utils/AppError';
import routes from './routes';
import { ExpressAdapter } from 'ask-sdk-express-adapter';
import * as Alexa from 'ask-sdk-core';

const skillBuilder = Alexa.SkillBuilders.custom();
const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, true, true);

// import '@shared/infra/typeorm';
// import '@shared/container';

const app = express();

// app.use(cors());
// app.use(express.json());

// app.use(routes);

app.post(
  '/alexa',
  adapter.getRequestHandlers(),
  (req: Request, res: Response) => {
    console.log('BATEU AQUI');

    return res.send();
  },
);

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => console.log('🚀 Server running on port 3333'));
