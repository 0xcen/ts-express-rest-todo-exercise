import { Router } from "express";
import {
	createTodo,
	getTodo,
	getTodos,
	removeTodo,
	updateTodo,
} from "../controllers/todoControllers";

const router = Router();

router.route("/").get(getTodos).post(createTodo);

router.route("/:id").get(getTodo).patch(updateTodo).delete(removeTodo);

export default router;
