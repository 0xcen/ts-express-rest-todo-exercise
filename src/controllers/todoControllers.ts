import { RequestHandler } from "express";
import { writeFileSync } from "fs";
import { Todo } from "../models/todo";
import todosArr from "../state/todos.json";

export const createTodo: RequestHandler = (req, res, next) => {
	const { text } = req.body as { text: string };
	const newData = [...todosArr, new Todo(Math.random().toString(), text)];

	writeFileSync("./src/state/todos.json", JSON.stringify(newData));

	res.status(201).json({
		message: "Todo created!",
		text,
	});
};

export const getTodos: RequestHandler = (req, res, next) => {
	res.status(200).json({
		message: "Success",
		items: todosArr.length,
		todos: todosArr,
	});
};

export const removeTodo: RequestHandler = (req, res) => {
	const { id } = req.params;

	const newData = todosArr.filter((t) => t.id !== id);

	writeFileSync("./src/state/todos.json", JSON.stringify(newData));

	res.status(204).send();
};

export const updateTodo: RequestHandler = (req, res) => {
	const { id } = req.params;
	const { text } = req.body;

	const arrToUpdate = [...todosArr];

	const index = arrToUpdate.findIndex((t) => t.id === id);

	if (index === -1) {
		return res.status(404).json({ message: "ID not found." });
	}

	arrToUpdate[index].text = text;
	writeFileSync("./src/state/todos.json", JSON.stringify(arrToUpdate));

	res.status(203).json({
		message: "Todo updated sucessfully",
		text,
	});
};

export const getTodo: RequestHandler = (req, res) => {
	const { id } = req.params;

	const query = todosArr.find((t) => t.id === id);

	if (!query) {
		return res.status(404).json({ message: "Could not find todo" });
	}
	res.status(200).json({
		message: "Success",
		todo: query,
	});
};
