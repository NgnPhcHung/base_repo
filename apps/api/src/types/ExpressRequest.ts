import { Request  } from 'express';

export interface ExpressRequest extends Request {
  cookies: { [key: string]: string };
}
