import { emptyOrRows } from "../helper/utils.js";
import { insertTask, selectAllTasks } from "../models/task.js";

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

const deleteTask = async (req, res, next) => {
	try {
		if (!req.body.id || req.body.description.id === 0) {
			const error = new Error("Invalid id");
			error.statusCode = 400;
			return next(error);
		}
		const result = await deleteTask(req.body.id);
		return res.status(200).json({ id: id });
	} catch (error) {
		return next(error);
	}
	/*
router.delete("/delete/:id", auth, (req, res, next) => {
	const id = parseInt(req.params.id);
	pool.query("delete from task where id = $1", [id], (error, result) => {
		if (error) {
			return next(error);
		}
		return res.status(200).json({ id: id });
	});
});
*/
};

export { getTasks, postTask, deleteTask };
