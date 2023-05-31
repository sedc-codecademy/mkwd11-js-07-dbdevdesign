import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class TaskMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    // console.log(req);
    console.log('Task middleware, for task controller.');

    next();
  }
}
