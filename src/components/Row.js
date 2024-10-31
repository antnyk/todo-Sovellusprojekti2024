import React from "react";

function Row({ item, deleteTask }) {
	return (
		//displays each task in the list
		<li key={item.id}>
			{item.description}
			<button className="deleteButton" onClick={() => deleteTask(item.id)}>
				Delete
			</button>
		</li>
	);
}

export default Row;
