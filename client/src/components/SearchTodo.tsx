import React from "react";

type Props = {
  searchTodo: (text: string) => void;
};

const SearchTodo: React.FC<Props> = ({ searchTodo }) => {
  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    searchTodo(e.currentTarget.value);
  };

  return (
    <div className="top-section">
      <div>
        <input onChange={handleInput} type="text" id="name" placeholder="Search" />
      </div>
    </div>
  );
};

export default SearchTodo;
