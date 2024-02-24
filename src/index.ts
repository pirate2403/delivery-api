import "reflect-metadata";
import { container } from "tsyringe";
import { config } from "dotenv";
import AppModule from "./app.module";

config();

container.resolve(AppModule);
