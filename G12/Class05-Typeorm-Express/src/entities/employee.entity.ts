import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "firstname",
  })
  firstName: string;

  @Column({
    name: "lastname",
  })
  lastName: string;

  @Column({
    name: "dateofbirth",
    type: "date",
  })
  dateOfBirth: string;

  @Column()
  gender: string;

  @Column({
    name: "hiredate",
    type: "date",
  })
  hireDate: string;

  @Column({
    name: "nationalidnumber",
  })
  nationalIdNumber: string;
}
