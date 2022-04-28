import express from "express";
import { todoRoute } from "./todo.routes";

export const routes = express.Router();

routes.use(todoRoute);
