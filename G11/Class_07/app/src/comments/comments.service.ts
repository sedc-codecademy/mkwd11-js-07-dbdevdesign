import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';
import { v4 as uuid } from 'uuid';
import { TaskEntity } from 'src/tasks/entities/task.entity';

@Injectable()
export class CommentsService {
  constructor(
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
    const task = await this.taskRepository.findOneBy({ id: taskId });

    const commentEntityInstance = this.commentRepository.create({
      id: uuid(),
      ...commentDto,
      createdAt: new Date(),
      task: task, //TaskEntity
    });

    const commentSaved = await this.commentRepository.save(
      commentEntityInstance,
    );

    return commentSaved.id;
  }
  // REMOVE COMMENT
  async remove(id: string) {
    await this.commentRepository.delete(id);
  }
}
