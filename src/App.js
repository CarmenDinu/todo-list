import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
function App() {
	const [task, setTask] = useState([]);
	const [newTask, setNewTask] = useState();
	const [checked, setChecked] = useState(true);

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

	let checkBox = async (item) => {
		await fetch('http://localhost:6789/tasks/' + item + '/status/', {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ isCompleted: checked }),
		});
		if (checked === true) {
			console.log('yey');
		} else if (checked === false) {
			console.log('ney');
		}
	};
	return (
		<div className="row justify-content-md-center">
			<div className="card" style={{ width: 400 }}>
				<img
					className="card-img-top"
					src="http://s3-ap-southeast-1.amazonaws.com/images.humanresourcesonline.net/wp-content/uploads/2014/08/SabrinaZolkifi-Aug-2014-multi-tasking-woman-cartoon-shutterstock.jpg"
					alt="Card"
				></img>
				<div className="card-body">
					<h4 className="card-title">Tasks List</h4>

					<input
						className="form-control"
						placeholder="Enter new task"
						type="text"
						onChange={(event) => setNewTask(event.target.value)}
						onKeyPress={handleKeypress}
						value={newTask}
					></input>

					<input
						className="form-control"
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
					<ul className="list-group">
						{task.map((item) => (
							<li className="list-group-item list-group-item-info" key={item.id}>
								<input
									onChange={() => checkBox(item.id)}
									type="checkbox"
									onClick={(event) => setChecked(event.target.checked)}
									value={checked}
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
