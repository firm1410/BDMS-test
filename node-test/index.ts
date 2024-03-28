// Import packages
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { TodolistModel } from "./model/TodolistModel";
// App
const app: Express = express();
let todolist: TodolistModel = require("./todolist.json");
// First route
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/todo", (_req: Request, res: Response) => {
  res.json(todolist);
});

app.get("/todo/:id", (req: Request, res: Response) => {
  const itemId = req.params.id;
  const item = todolist.todos.find((i) => i.id === +itemId);
  res.json(item);
});

app.post("/todo", (req: Request, res: Response) => {
  const { message } = req.body;
  const todo = {
    id: todolist.todos.length,
    todo: message,
    completed: false,
  };
  todolist.todos.push(todo);
  todolist.total = todolist.todos.length;
  res.json(todo);
});
app.put("/todo/complete/:id", (req, res) => {
  const itemId = +req.params.id;
  const todoId = todolist.todos.findIndex((i) => i.id === itemId);
  todolist.todos[todoId].completed = true;
  res.json(todolist.todos[todoId]);
});

app.delete("/todo/:id", (req, res) => {
  const itemId = req.params.id;
  const item = todolist.todos.find((i) => i.id === +itemId);
  todolist.todos = todolist.todos.filter((i) => i.id !== +itemId);
  res.json(item);
});

app.listen("1337");
