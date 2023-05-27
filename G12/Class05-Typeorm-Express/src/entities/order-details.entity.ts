import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Product } from "./product.entity";

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
}
