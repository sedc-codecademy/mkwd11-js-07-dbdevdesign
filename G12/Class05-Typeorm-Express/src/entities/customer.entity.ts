import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    // this is the name of the column in the database we want to connect with the property in the entity
    name: "accountnumber",
  })
  accountNumber: string;

  @Column()
  city: string;

  @Column({
    name: "regionname",
  })
  regionName: string;

  @Column({
    name: "phonenumber",
  })
  phoneNumber: string;

  @Column({
    name: "isactive",
  })
  isActive: boolean;
}
