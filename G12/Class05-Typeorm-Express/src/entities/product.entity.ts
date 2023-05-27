import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: "float4",
  })
  weight: number;

  @Column({
    type: "float4",
  })
  price: number;

  @Column({
    type: "float4",
  })
  cost: number;
}
