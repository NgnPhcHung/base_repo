// src/common/async-context.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AsyncContextService } from './async-context.service';

@Injectable()
export class AsyncContextMiddleware implements NestMiddleware {
  constructor(private asyncContextService: AsyncContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.asyncContextService.run(() => {
      this.asyncContextService.set('user', req.user);
      next();
    });
  }
}
