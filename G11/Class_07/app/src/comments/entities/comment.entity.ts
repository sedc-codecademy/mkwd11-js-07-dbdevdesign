import { TaskEntity } from 'src/tasks/entities/task.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('comments')
export class CommentEntity {
  @PrimaryColumn() // same as Column but makes the property as PRIMARY KEY
  id: string;

  @Column()
  content: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => TaskEntity, (task) => task.comments, { onDelete: 'CASCADE' })
  task: TaskEntity;
}
