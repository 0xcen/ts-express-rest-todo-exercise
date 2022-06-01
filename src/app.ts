import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import todoRoutes from "./routes/todoRoutes";

const app = express();
app.use(json());

app.use("/todo", todoRoutes);

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
	next(res.status(500).json({ message: err.message, error: err }));
});

app.listen(3000, () => {
	console.log("Server running");
});
