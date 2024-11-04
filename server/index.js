import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { router as todoRouter } from "./routes/todoRouter.js";
import { router as userRouter } from "./routes/userRouter.js";

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", todoRouter);
app.use("/user", userRouter);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.log("Middleware StatusCode:", statusCode); // Log for debugging
	res.status(statusCode).json({ error: err.message });
});

app.listen(port);
