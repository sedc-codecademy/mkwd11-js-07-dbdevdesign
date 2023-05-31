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

  async getTasks() {
    // WAY ONE
    // const query = `
    // SELECT *
    // FROM tasks
    // LEFT JOIN comments
    // ON comments.taskId = tasks.id
    // `;
    // const tasks = await this.tasksRepository.query(query);

    // return tasks;

    // WAY TWO
    const tasks = await this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.comments', 'comment')
      .getMany();

    return tasks;

    // INITIAL WAY
    // return this.tasksRepository.find({
    //   relations: ['comments'],
    // });
  }

  async getTaskNames() {
    // WAY ONE
    const query = `
    SELECT name
    FROM tasks
    `;

    const taskNames = await this.tasksRepository.query(
      // `SELECT name FROM tasks`,

      // same as above
      query,
    );

    return taskNames;
  }

  async findOne(id: string) {
    // DATABASE OPERATIONS // id === id
    // INITIAL WAY
    // const task = await this.tasksRepository.findOne({
    //   where: { id: id },
    //   relations: ['comments'],
    // });

    // QUERY - WAY ONE
    // const query = `
    // SELECT *
    // FROM tasks
    // LEFT JOIN comments
    // ON comments.taskId = tasks.id
    // WHERE tasks.id = '${id}'
    // `;

    // const task = await this.tasksRepository.query(query);

    // QUERY - WAY TWO
    // const query = `
    // SELECT *
    // FROM tasks
    // LEFT JOIN comments
    // ON comments.taskId = tasks.id
    // WHERE tasks.id = $1
    // `;

    // const task = await this.tasksRepository.query(query, [id]);

    // THIRD WAY
    const task = await this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.comments', 'comment')
      .where('task.id = :id', { id })
      .getOne();

    if (!task) {
      throw new NotFoundException(`Task with id: ${id} was not found.`);
    }

    return task;
  }

  async getTasksByQuery(queryValue: string) {
    // WAY ONE
    // if (queryValue === 'true') {
    //   const query = `
    //   SELECT *
    //   FROM tasks
    //   WHERE status = 'COMPLETED';
    //   `;

    //   const completedTasks = await this.tasksRepository.query(query);
    //   return completedTasks;
    // } else if (queryValue === 'false') {
    //   const query = `
    //   SELECT *
    //   FROM tasks
    //   WHERE status <> 'COMPLETED';
    //   `;

    //   const inCompletedTasks = await this.tasksRepository.query(query);

    //   return inCompletedTasks;
    // }

    // WAY TWO

    const query = `
    SELECT * FROM
    get_tasks_by_status($1);
    `;

    const results = await this.tasksRepository.query(query, [queryValue]);

    return results;
  }

  async createTask(taskDto: TaskDto) {
    // INITIAL WAY

    // const task: Task = {
    //   ...taskDto,
    //   id: uuid(),
    //   dueDate: new Date(taskDto.dueDate).getTime(),
    // };

    // const objectOfTaskEntinty = this.tasksRepository.create(task);

    // const tasksSaved = await this.tasksRepository.save(objectOfTaskEntinty);
    // console.log(tasksSaved);
    // return task.id;

    // WAY ONE QUERY
    const taskId = uuid();
    const dueDate = new Date(taskDto.dueDate).getTime();

    const query = `
    INSERT INTO tasks (id, name, description, dueDate, priority, status)
    VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await this.tasksRepository.query(query, [
      taskId,
      taskDto.name,
      taskDto.description,
      dueDate,
      taskDto.priority,
      taskDto.status,
    ]);

    return taskId;
  }

  async remove(id: string) {
    // INITIAL WAY
    // const response = await this.tasksRepository.delete(id);

    const query = `
      DELETE FROM tasks
      WHERE id = $1;
    `;

    await this.tasksRepository.query(query, [id]);
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

// const deleteTask = async (id) => {
//   const reponse = await fetch(`localhost:3000/tasks/${id}`, {
//     method: 'DELETE'
//   })
// }
