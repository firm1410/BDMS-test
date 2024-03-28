"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import packages
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// App
const app = (0, express_1.default)();
let todolist = require("./todolist.json");
// First route
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get("/todo", (_req, res) => {
    res.json(todolist);
});
app.get("/todo/:id", (req, res) => {
    const itemId = req.params.id;
    const item = todolist.todos.find((i) => i.id === +itemId);
    res.json(item);
});
app.post("/todo", (req, res) => {
    const { message } = req.body;
    console.log(message);
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
