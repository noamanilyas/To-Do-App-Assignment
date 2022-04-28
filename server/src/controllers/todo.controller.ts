import { Request, Response } from "express";
import * as Joi from "joi";
import { JoiObjectId } from "../common/joi-object-validator.function";
import NotFoundError from "../core/error/notFound.error";
import ValidationError from "../core/error/validation.error";
import { errorResponse, successResponse } from "../core/handlers/api-response.handler";
import { Todo } from "../models/todo.model";
import RandomTitles from "../models/todo-titles.json";

export async function getAllTodos(req: Request, res: Response): Promise<void> {
  try {
    const todos = await Todo.find();

    const response = todos.map((item) => ({
      id: item._id,
      name: item.name,
      status: item.status,
    }));

    successResponse(res, response);
  } catch (err) {
    errorResponse(res, err);
  }
}

export async function createTodo(req: Request, res: Response): Promise<void> {
  try {
    // const { body } = req;

    // const schema = Joi.object().keys({
    //   name: Joi.string().required(),
    // });
    // const { error } = schema.validate(body);
    // if (error) {
    //   throw new ValidationError("Invalid request, Some parameters are missing or incorrect.");
    // }

    const randNum = Math.floor(Math.random() * 10);

    const document = {
      name: RandomTitles[randNum],
      status: false,
    };

    const todo = await Todo.create(document);

    if (!todo) {
      throw new Error("Todo not created");
    }
    getAllTodos(req, res);
  } catch (err) {
    errorResponse(res, err);
  }
}

export async function updateTodo(req: Request, res: Response): Promise<void> {
  try {
    const { body } = req;

    const schema = Joi.object().keys({
      id: JoiObjectId().required(),
      status: Joi.boolean().required(),
    });
    const { error } = schema.validate(body);
    if (error) {
      throw new ValidationError("Invalid request, Some parameters are missing or incorrect.");
    }

    const todo = await Todo.findByIdAndUpdate({ _id: body.id }, { status: body.status });

    if (!todo) {
      throw new Error("Todo not updated");
    }
    getAllTodos(req, res);
  } catch (error) {
    throw error;
  }
}

export async function deleteTodo(req: Request, res: Response): Promise<void> {
  try {
    const { body } = req;

    const schema = Joi.object().keys({
      id: JoiObjectId().required(),
    });
    const { error } = schema.validate(body);

    if (error) {
      throw new ValidationError("Invalid request, Some parameters are missing or incorrect.");
    }

    const todo = await Todo.findByIdAndRemove(body.id);

    if (!todo) {
      throw new Error("Todo not deleted");
    }
    getAllTodos(req, res);
  } catch (error) {
    throw error;
  }
}

export async function deleteAllTodo(req: Request, res: Response): Promise<void> {
  try {
    const todosList = await Todo.find();

    if (todosList) {
      const todos = await Todo.deleteMany({ _id: { $in: todosList.map((item) => item._id) } });

      if (!todos) {
        throw new Error("Todos not deleted");
      }
    }

    successResponse(res, {});
  } catch (error) {
    throw error;
  }
}
