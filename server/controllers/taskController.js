import { emptyOrRows } from "../helper/utils.js";
import { insertTask, selectAllTasks, deleteTask } from "../models/task.js";

const getTasks = async (req, res, next) => {
	try {
		const result = await selectAllTasks();
		return res.status(200).json(emptyOrRows(result));
	} catch (error) {
		return next(error);
	}
};

const postTask = async (req, res, next) => {
	try {
		if (!req.body.description || req.body.description.length === 0) {
			const error = new Error("Invalid description for task");
			error.statusCode = 400;
			return next(error);
		}
		const result = await insertTask(req.body.description);
		return res.status(200).json({ id: result.rows[0].id });
	} catch (error) {
		return next(error);
	}
};

const deletetionTask = async (req, res, next) => {
	try {
		const id = parseInt(req.params.id);
		if (isNaN(id) || id <= 0) {
			const error = new Error("Invalid id");
			error.statusCode = 400;
			return next(error);
		}
		const result = await deleteTask(id);
		return res.status(200).json({ id: result });
	} catch (error) {
		return next(error);
	}
};

export { getTasks, postTask, deletetionTask };
