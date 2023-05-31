import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Priority, Status, Task } from 'src/interfaces/task.interface';
import { TaskDto, UpdateTaskDto } from './dto/task.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
  ) {}

  tasks: Task[] = [
    {
      id: '1',
      name: 'Task 1',
      description: 'Description 1',
      dueDate: new Date('2023-04-30').getTime(), // will return timestamp from given date
      priority: Priority.HIGH,
      status: Status.IN_PROGRESS,
    },
    {
      id: '2',
      name: 'Task 2',
      description: 'Description 2',
      dueDate: new Date('2023-04-18').getTime(),
      priority: Priority.HIGH,
      status: Status.COMPLETED,
    },
    {
      id: '3',
      name: 'Task 3',
      description: 'Description 3',
      dueDate: new Date('2023-05-30').getTime(),
      priority: Priority.LOW,
      status: Status.PENDING,
    },
  ];

  getTasks() {
    return this.tasksRepository.find({
      relations: ['comments'],
    });
  }

  getTaskNames() {
    const taskNames = this.tasks.map((task) => task.name);

    return taskNames;
  }

  async findOne(id: string) {
    // DATABASE OPERATIONS // id === id
    const task = await this.tasksRepository.findOne({
      where: { id: id },
      relations: ['comments'],
    });

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} was not found.`);
    }

    return task;
  }

  getTasksByQuery(queryValue: string) {
    if (queryValue === 'true') {
      const completedTasks = this.tasks.filter(
        (task) => task.status === Status.COMPLETED,
      );

      return completedTasks;
    } else if (queryValue === 'false') {
      const notCompleted = this.tasks.filter(
        (task) => task.status !== Status.COMPLETED,
      );

      return notCompleted;
    }

    throw new HttpException(
      'Wrong input, query is not supported',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  async createTask(taskDto: TaskDto) {
    const task: Task = {
      ...taskDto,
      id: uuid(),
      dueDate: new Date(taskDto.dueDate).getTime(),
    };

    const objectOfTaskEntinty = this.tasksRepository.create(task);

    const tasksSaved = await this.tasksRepository.save(objectOfTaskEntinty);
    console.log(tasksSaved);
    return task.id;
  }

  async remove(id: string) {
    const response = await this.tasksRepository.delete(id);
  }

  async updateOne(id: string, updateTaskDto: UpdateTaskDto) {
    const updatedTask: Task = {
      id: id,
      ...updateTaskDto,
      dueDate: new Date(updateTaskDto.dueDate).getTime(), // from date => timestamp
    };

    const task = await this.tasksRepository.preload({
      id: id,
      ...updatedTask,
    });

    if (!task) {
      throw new NotFoundException(
        `Task with id: ${id} was not found to update.`,
      );
    }
    await this.tasksRepository.save(task);

    return task.id;
  }
}
