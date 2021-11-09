// import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

import AppError from '@utils/AppError';
import routes from './routes';

// import '@shared/infra/typeorm';
// import '@shared/container';

const app = express();

// app.use(
//   express.json({
//     verify: (req, res, buf) => {
//       req.rawBody = buf.toString();
//     },
//   }),
// );

app.use(cors());
// app.use(express.json());

app.use(routes);

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

app.listen(process.env.PORT || 3333, () =>
  console.log('🚀 Server running on port 3333'),
);
