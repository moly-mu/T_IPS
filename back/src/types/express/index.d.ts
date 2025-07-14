import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: number | JwtPayload;
    user?: number | JwtPayload; // o number, dependiendo de lo que sea
  }
}
