import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "sedc",
  entities: ["dist/entities/*.js"],
  // Logs to the console the queries that are being sent to the database
  logging: true,
  //   Avoid like the plague if you are using an already preexisting database
  // synchronize: true,
});
