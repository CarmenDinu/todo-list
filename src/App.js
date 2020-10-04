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
	let handleKeypress = (e) => {
		if (e.key === 'Enter') {
			postWishWithAsync();
			setNewTask('');
		}
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

	let checkBox = async (item, status) => {
		await fetch('http://localhost:6789/tasks/' + item + '/status/', {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ isCompleted: status }),
		});
		let resp = await fetch('http://localhost:6789/tasks');
		let dates = await resp.json();
		setTask(dates);
	};
	return (
		<div className="row justify-content-md-center">
			<div className="card p-3 m-5" style={{ width: 650 }}>
				<img
					className="card-img-top"
					src="https://images.ctfassets.net/y5z23yb0t4f0/6HoqTFB9Sp7u7WdLBw0mN8/56af5b3f59dd5fc3c57b65bed1125df0/GettyImages-6696383282.jpg"
					alt="Card"
				></img>
				<div className="card-body">
					<h4 className="card-title">Tasks List</h4>

					<input
						className=" form-control form-control-lg "
						placeholder="Enter new task and press Enter"
						type="text"
						onChange={(event) => setNewTask(event.target.value)}
						onKeyPress={handleKeypress}
						value={newTask}
					></input>
					<br></br>
					<input
						className="form-control form-control-lg "
						placeholder="Filter tasks"
						onChange={(e) =>
							fetch('http://localhost:6789/tasks/filter/?name=' + e.target.value)
								.then((response) => {
									return response.json();
								})
								.then((data) => {
									setTask(data);
								})
						}
						type="text"
					></input>
					<br></br>
					<ul className="list-group">
						{task.map((item) => (
							<li
								className={
									item.isCompleted
										? 'list-group-item list-group-item-danger '
										: 'list-group-item list-group-item-primary '
								}
								key={item.id}
							>
								<input
									type="checkbox"
									onClick={(status) => checkBox(item.id, status.target.checked)}
									checked={item.isCompleted}
								></input>

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
