export interface TodolistModel {
  todos: TodoModel[];
  total: number;
  skip: number;
  limit: number;
}
export interface TodoModel {
  id: number;
  todo: string;
  completed: boolean;
}
