import React from "react";
import { ITodo, TodoProps } from "../types/ITodo.type";

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (id: string) => void;
};

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : "";
  return (
    <div className="card">
      <div className="card-text-div">
        <h1 className={checkTodo}>{todo.name}</h1>
      </div>
      <div className="card-button-div">
        <button
          onClick={() => updateTodo({ ...todo, status: true })}
          className={todo.status ? `hide-button` : "button-done"}
        >
          Done
        </button>
        <button
          onClick={() => updateTodo({ ...todo, status: false })}
          className={!todo.status ? `hide-button` : "button-notdone"}
        >
          Not Done
        </button>
        <button onClick={() => deleteTodo(todo.id)} className="button-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
