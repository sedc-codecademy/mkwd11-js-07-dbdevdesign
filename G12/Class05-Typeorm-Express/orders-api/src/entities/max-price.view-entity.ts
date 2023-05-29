import { ViewEntity, ViewColumn, DataSource } from "typeorm";
import { dataSource } from "../app.data-source";
import { BusinessEntity } from "./busines-entity.entity";

@ViewEntity({
  name: "vw_max_price",
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder(BusinessEntity, "be")
      .leftJoinAndSelect("be.orders", "o")
      .select("be.id", "id")
      .addSelect("be.name", "name")
      .addSelect("MAX(o.totalprice)", "maxPrice")
      .addSelect("MIN(o.totalprice)", "minPrice")
      .groupBy("be.id");
  },
})
export class MaxPriceView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  maxPrice: number;

  @ViewColumn()
  minPrice: number;
}
