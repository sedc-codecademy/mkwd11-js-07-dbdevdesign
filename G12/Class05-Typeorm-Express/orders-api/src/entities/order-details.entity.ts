import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Product } from "./product.entity";
import { Order } from "./order.entity";

@Entity({
  name: "orderdetails",
})
export class OrderDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: "productid",
  })
  product: Product;

  @OneToOne(() => Order, order => order.orderDetails)
  @JoinColumn({
    name: "orderid",
  })
  order: Order;
}
