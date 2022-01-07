import { Server } from 'socket.io';
declare module 'express-serve-static-core' {
  interface Request {
    user: {
      id: string;
    };
    io: Server;
    file: {
      filename: string;
    };
  }
}
