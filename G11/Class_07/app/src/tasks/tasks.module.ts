import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { CommentsService } from 'src/comments/comments.service';
import { CommentsController } from 'src/comments/comments.controller';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { TaskMiddleware } from './middlewares/task.middleware';

// Feature module
@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, CommentEntity])],
  providers: [TasksService, CommentsService],
  controllers: [TasksController, CommentsController],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(TaskMiddleware).forRoutes('/tasks');
    consumer
      .apply(TaskMiddleware)
      .forRoutes({ path: '/tasks', method: RequestMethod.GET });
  }
}
