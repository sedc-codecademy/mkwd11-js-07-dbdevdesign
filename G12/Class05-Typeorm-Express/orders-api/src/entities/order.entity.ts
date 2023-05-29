import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { BusinessEntity } from "./busines-entity.entity";
import { Employee } from "./employee.entity";
import { Customer } from "./customer.entity";
import { OrderDetails } from "./order-details.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "orderdate",
    type: "date",
  })
  orderDate: string;

  @Column()
  status: number;

  @Column({
    name: "totalprice",
  })
  totalPrice: number;

  @Column()
  comment: string;

  @ManyToOne(() => BusinessEntity, businessEntity => businessEntity.orders)
  @JoinColumn({
    name: "businessentityid",
  })
  businessEntity: BusinessEntity;

  @ManyToOne(() => Employee)
  @JoinColumn({
    name: "employeeid",
  })
  employee: Employee;

  @ManyToOne(() => Customer)
  @JoinColumn({
    name: "customerid",
  })
  customer: Customer;

  @OneToOne(() => OrderDetails, orderDetails => orderDetails.order)
  orderDetails: OrderDetails;
}
