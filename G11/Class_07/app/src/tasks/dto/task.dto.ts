import { Priority, Status } from 'src/interfaces/task.interface';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @ApiProperty()
  description: string;
  @ApiProperty()
  dueDate: string;
  @ApiProperty({ enum: ['HIGH', 'MEDIUM', 'LOW'] })
  priority: Priority;

  @ApiProperty({
    enum: ['COMPLETED', 'IN PROGRESS', 'POSTPONED', 'DECLINED', 'PENDING'],
  })
  @IsNotEmpty() // This decorator will check if status property is send during the REQUEST
  status: Status;
}

export class UpdateTaskDto {
  name: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: Status;
}
