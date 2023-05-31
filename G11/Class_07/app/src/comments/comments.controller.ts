import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}
  // GET ALL COMMENTS
  @Get()
  async getComments() {
    const comments = await this.commentService.getComments();
    return comments;
  }
  // GET COMMENT BY ID
  @Get(':id') //localhost:3000/comments/id_here
  async getCommentById(@Param('id') id: string) {
    const comment = await this.commentService.getCommentById(id);

    return comment;
  }
  // CREATE COMMENT
  @Post(':taskId')
  async create(
    @Body() commentDto: CommentDto,
    @Param('taskId') taskId: string,
  ) {
    const id = await this.commentService.createComment(commentDto, taskId);

    return {
      message: 'Comment created.',
      id: id,
    };
  }
  // REMOVE COMMENT
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.commentService.remove(id);

    return {
      message: `Comment with id: ${id} was deleted.`,
    };
  }
}
