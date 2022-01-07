import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import { createServer } from 'http';
import { Server } from 'socket.io';

import AppError from '@utils/AppError';
import routes from './routes';
import { IncomingMessage } from 'http';

interface CustomIncomingMessage extends IncomingMessage {
  rawBody: string;
}

import './database';
import './providers';

const app = express();

const server = createServer(app);
export const io = new Server(server, {});

io.on('connection', socket => {
  socket.on('Authenticated', args => {
    const { alexa_id, user_id } = args;

    console.log('enviou');

    socket.emit(`Authenticated-46034649-ad4f-4b40-8933-64d75a1aac04`, alexa_id);
  });
});

app.use(
  express.json({
    verify: (req: CustomIncomingMessage, res, buf) => {
      req.rawBody = buf.toString();
    },
  }),
);

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

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

server.listen(process.env.PORT || 3333, () =>
  console.log('🚀 Server running on port 3333'),
);
