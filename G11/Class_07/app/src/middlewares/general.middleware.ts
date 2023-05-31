import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class GeneralMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('This is generic middleware');
    const time = new Date().getTime();

    console.log('Server was requested at: ', time);

    Logger.log('Server was requested at: ', time);
    Logger.log('This is our task management application.');
    next();
  }
}
