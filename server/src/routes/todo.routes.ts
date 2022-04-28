import express from "express";

import * as todoController from "../controllers/todo.controller";

export const todoRoute = express.Router();

todoRoute.get("/todo", todoController.getAllTodos);
todoRoute.post("/todo", todoController.createTodo);
todoRoute.put("/todo", todoController.updateTodo);
todoRoute.delete("/todo", todoController.deleteTodo);
todoRoute.delete("/todoAll", todoController.deleteAllTodo);
