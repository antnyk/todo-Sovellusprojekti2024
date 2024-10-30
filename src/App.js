import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);

	const addTask = () => {
		setTasks([...tasks, task]); // adds new task
		setTask(""); //clears input field
	};

	const deleteTask = (deleted) => {
		const withoutRemoved = tasks.filter((item) => item !== deleted);
		setTasks(withoutRemoved);
	};

	return (
		<div id="container">
			<h3>Todos</h3>
			<form>
				<input
					placeholder="Add new task"
					value={task}
					// e = event
					onChange={(e) => setTask(e.target.value)} // updates task when user types
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							addTask();
						}
					}}
				/>
			</form>
			<ul>
				{tasks.map((item) => (
					<li>
						{item}
						<button className="deleteButton" onClick={() => deleteTask(item)}>
							Delete
						</button>
					</li> //displays each task in the list
				))}
			</ul>
		</div>
	);
}

export default App;
