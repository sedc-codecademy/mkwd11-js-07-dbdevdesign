import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
  name: "businessentity",
})
export class BusinessEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  region: string;

  @Column()
  zipcode: string;

  @Column()
  size: string;
}
