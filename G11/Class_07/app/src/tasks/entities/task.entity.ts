import { CommentEntity } from 'src/comments/entities/comment.entity';
import { Priority, Status, Task } from 'src/interfaces/task.interface';
import { Entity, Column, PrimaryColumn, OneToMany, JoinTable } from 'typeorm';

@Entity('tasks')
export class TaskEntity implements Task {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'bigint',
  })
  dueDate: number; //timestamp

  @Column()
  priority: Priority;

  @Column()
  status: Status;

  @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.task)
  comments: CommentEntity[];
}
