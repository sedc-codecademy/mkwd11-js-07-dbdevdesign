import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  name: "vw_customer_orders",
})
export class CustomerOrdersView {
  @ViewColumn({
    name: "customerid",
  })
  customerId: number;

  @ViewColumn()
  name: string;

  @ViewColumn({
    name: "orders_max",
  })
  ordersMax: number;

  @ViewColumn({
    name: "orders_sum",
  })
  ordersSum: number;
}
