export interface ITodo {
  id: string;
  name: string;
  status: boolean;
}

export type TodoProps = {
  todo: ITodo;
};

export type ApiDataType = {
  error: boolean;
  status: boolean;
  result: ITodo[];
};
