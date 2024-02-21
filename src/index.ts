import "reflect-metadata";
import { config } from "dotenv";
import { container } from "tsyringe";
import AppModule from "./app/app.module";

config();
container.resolve(AppModule);
