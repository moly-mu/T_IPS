import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string | JwtPayload;
    user?: string | JwtPayload; // o number, dependiendo de lo que sea
  }
}
