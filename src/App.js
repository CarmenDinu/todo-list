import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
function App() {
	const [task, setTask] = useState([]);
	const [newTask, setNewTask] = useState();

	useEffect(() => {
		fetch(' http://localhost:6789/tasks')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				setTask(data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	let postWishWithAsync = async () => {
		await fetch('http://localhost:6789/tasks', {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: newTask }),
		});
		let resp = await fetch('http://localhost:6789/tasks');
		let dates = await resp.json();
		setTask(dates);
	};
	let deleteTask = async (item) => {
		await fetch('http://localhost:6789/tasks/' + item, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		let resp = await fetch('http://localhost:6789/tasks');
		let dates = await resp.json();
		setTask(dates);
	};
	let handleKeypress = (e) => {
		if (e.key === 'Enter') {
			postWishWithAsync();
			setNewTask('');
		}
	};

	return (
		<div class="container">
			<div class="row justify-content-md-center">
				<div class="col col-lg-6 centering">
					<input
						placeholder="Enter new task"
						type="text"
						onChange={(e) => setNewTask(e.target.value)}
						onKeyPress={handleKeypress}
						value={newTask}
					></input>
					<input placeholder="Filter tasks" type="text"></input>
					<ul>
						{task.map((item) => (
							<li key={item.id}>
								<input type="checkbox"></input>
								<a href={item.url}>{item.title}</a>
								<button className="btn btn-outline-success" onClick={() => deleteTask(item.id)}>
									Delete
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default App;
