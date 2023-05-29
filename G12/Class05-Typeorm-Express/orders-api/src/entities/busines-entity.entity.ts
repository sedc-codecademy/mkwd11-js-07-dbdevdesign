import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./order.entity";

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

  @OneToMany(() => Order, order => order.businessEntity)
  orders: Order[];
}
