import axios, { AxiosResponse } from "axios";
import { ApiDataType, ITodo } from "./types/ITodo.type";

const baseUrl: string = "http://localhost:1337";

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const result: AxiosResponse<ApiDataType> = await axios.get(baseUrl + "/todo");
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const addTodo = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const result: AxiosResponse<ApiDataType> = await axios.post(baseUrl + "/todo");
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTodo = async (todo: ITodo): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const body = {
      id: todo.id,
      status: todo.status,
    };
    const result: AxiosResponse<ApiDataType> = await axios.put(`${baseUrl}/todo`, body);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTodo = async (id: string): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const body = {
      data: {
        id: id,
      },
    };
    const result: AxiosResponse<ApiDataType> = await axios.delete(`${baseUrl}/todo`, body);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAllTodo = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const result: AxiosResponse<ApiDataType> = await axios.delete(`${baseUrl}/todoAll`);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
