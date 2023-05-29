import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "sedc",
  entities: ["dist/entities/*.js"],
  logging: true,
  //   Avoid like the plague if you are using an already preexisting database
  //   synchronize: false
});
