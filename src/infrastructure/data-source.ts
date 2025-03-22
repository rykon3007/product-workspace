import { DataSource } from "typeorm";
import { User } from "@/domain/entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./data/database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User],
});
