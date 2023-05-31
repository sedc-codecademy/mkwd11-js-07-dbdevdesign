import {
  Controller,
  Get,
  HttpCode,
  Param,
  Req,
  Res,
  HttpException,
  HttpStatus,
  Query,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Response, Request } from 'express';
import { TaskDto, UpdateTaskDto } from './dto/task.dto';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/interfaces/role.enum';
import { RolesGuard } from 'src/common/auth/role-guard/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

interface IdRouteParams {
  id: string;
}

@Controller('tasks')
@ApiBearerAuth() // only used for swagger
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getTasks() {
    const tasks = this.taskService.getTasks();

    return tasks;
  }

  @Get('names')
  @HttpCode(202)
  getTaskNames(@Res() response: Response) {
    const tasksNames = this.taskService.getTaskNames();

    return tasksNames;
  }

  @Get('query')
  getCompleted(@Query('completed') completed: string) {
    console.log('Completed query param value', completed);

    const tasks = this.taskService.getTasksByQuery(completed);

    return tasks;
  }

  @Get(':id')
  findOne(
    //@Res() response: Response,
    @Req() request: Request, // Library express specific
    @Param() params: IdRouteParams,
  ) {
    console.log(params);
    const id: string = params.id;

    const task = this.taskService.findOne(id);
    console.log(task);
    if (task === undefined) {
      throw new HttpException(
        `Task with id ${id} was not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    return task;
  }

  @Post()
  @Roles(Role.ADMIN) // ONLY ADMIN ROUTE => admin => ['admin']
  async create(@Body() body: TaskDto) {
    console.log(body);

    const id = await this.taskService.createTask(body);

    return {
      message: `Task was created`,
      id: id,
    };
  }

  //Delete Method
  @Delete(':id') // params.id
  async deleteOne(@Param('id') id: string) {
    await this.taskService.remove(id);
    return {
      message: `Task with id: ${id} was removed.`,
    };
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const idOfTask = await this.taskService.updateOne(id, updateTaskDto);

    return {
      message: 'Task was updated',
      id: idOfTask,
    };
  }
}
