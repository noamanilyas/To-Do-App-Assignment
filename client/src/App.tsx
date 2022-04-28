import React, { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
import { getTodos, addTodo, updateTodo, deleteTodo, deleteAllTodo } from "./API";
import SearchTodo from "./components/SearchTodo";
import { ITodo } from "./types/ITodo.type";

const App: React.FC = () => {
  const defaultTodo = { id: "default", name: "Create todo list.", status: true };
  const [todos, setTodos] = useState<ITodo[]>([defaultTodo]);
  const [searchedKeyword, setSearchedKeyword] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const getDefaultItem = (): ITodo | any => {
    const defaultTodo = todos.find((item) => item.id === "default");
    return defaultTodo;
  };

  const fetchTodos = (): void => {
    deleteAllTodo()
      .then(() => {
        getTodos()
          .then(({ data: { result } }: ITodo[] | any) => {
            const defaultItem = getDefaultItem();
            if (defaultItem) {
              setTodos([defaultItem, ...result]);
            } else {
              setTodos(result);
            }
          })
          .catch((err: Error) => console.log(err));
      })
      .catch((err: Error) => console.log(err));
  };

  const handleSaveTodo = (): void => {
    addTodo()
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not saved");
        }
        const defaultItem = getDefaultItem();
        if (defaultItem) {
          setTodos([defaultItem, ...data.result]);
        } else {
          setTodos(data.result);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateTodo = (todo: ITodo): void => {
    if (todo.id === "default") {
      const defaultItemIndex = todos.findIndex((item) => item.id === "default");
      todos[defaultItemIndex].status = todo.status;
      setTodos([...todos]);
      return;
    }
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated");
        }
        const defaultItem = getDefaultItem();
        if (defaultItem) {
          setTodos([defaultItem, ...data.result]);
        } else {
          setTodos(data.result);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteTodo = (id: string): void => {
    if (id === "default") {
      const remTodos = todos.filter((item) => item.id !== "default");
      setTodos(remTodos);
      return;
    }
    deleteTodo(id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted");
        }
        const defaultItem = getDefaultItem();
        if (defaultItem) {
          setTodos([defaultItem, ...data.result]);
        } else {
          setTodos(data.result);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSearchTodo = (text: string): void => {
    setSearchedKeyword(text.trim());
  };

  return (
    <main className="app">
      <h1>Todos App</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      <SearchTodo searchTodo={handleSearchTodo} />
      {todos
        .filter((item: ITodo) => {
          if (!searchedKeyword) return item;
          else if (item.name.toLowerCase().includes(searchedKeyword.toLowerCase())) return item;
        })
        .map((todo: ITodo) => (
          <TodoItem key={todo.id} updateTodo={handleUpdateTodo} deleteTodo={handleDeleteTodo} todo={todo} />
        ))}
    </main>
  );
};

export default App;
