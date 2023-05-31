import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { DataSource, Repository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';
import { v4 as uuid } from 'uuid';
import { TaskEntity } from 'src/tasks/entities/task.entity';

@Injectable()
export class CommentsService {
  constructor(
    private dataSource: DataSource,

    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,

    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}
  // GET ALL COMMENTS
  async getComments(): Promise<CommentEntity[]> {
    return await this.commentRepository.find({ relations: ['task'] });
  }

  // GET COMMENT BY ID
  async getCommentById(id: string): Promise<CommentEntity> {
    const comment = await this.commentRepository.findOneBy({ id: id });

    return comment;
  }

  // CREATE COMMENT
  async createComment(commentDto: CommentDto, taskId: string): Promise<string> {
    const commentId = uuid();

    this.dataSource.manager.transaction(async (entityMenager) => {
      const task = await this.taskRepository.findOneBy({ id: taskId });

      const commentEntityInstance = this.commentRepository.create({
        id: commentId,
        ...commentDto,
        createdAt: new Date(),
        task: task, //TaskEntity
      });

      await entityMenager.save(commentEntityInstance);

      throw new HttpException('Some dummy error', 400);
    });

    return commentId;
  }
  // REMOVE COMMENT
  async remove(id: string) {
    await this.commentRepository.delete(id);
  }
}
