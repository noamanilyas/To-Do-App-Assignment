import React from "react";

type Props = {
  saveTodo: () => void;
};

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  return (
    <div className="top-section">
      <button onClick={() => saveTodo()}>Add Todo</button>
    </div>
  );
};

export default AddTodo;
