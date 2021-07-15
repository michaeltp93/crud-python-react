import { useState, useEffect } from 'react';

const API = process.env.REACT_APP_API_URI;

const Users = () => {
	const [users, setUsers] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [drawUsers, setdrawUsers] = useState([]);
	const [id, setId] = useState('');
	const [editing, setEditing] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();

		if (!editing) {
			const res = await fetch(`${API}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...users,
				}),
			});
			const data = await res.json();
			console.log(data);
		} else {
			const res = await fetch(`${API}/users/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...users,
				}),
			});
			const data = await res.json();
			console.log('data :>> ', data);
			setEditing(false);
			setId('');
		}

		await getUsers();
		setUsers({
			name: '',
			email: '',
			password: '',
		});
	};

	const getUsers = async () => {
		const res = await fetch(`${API}/users`);
		const data = await res.json();
		setdrawUsers(data);
	};

	useEffect(() => {
		getUsers();
	}, []);

	const deleteUser = async id => {
		const isTrue = window.confirm('Are you sure you want to delete it?');

		if (isTrue) {
			const res = await fetch(`${API}/users/${id}`, {
				method: 'DELETE',
			});

			const data = await res.json();
			await getUsers();
			console.log('data :>> ', data);
		}
	};

	const editUser = async id => {
		const res = await fetch(`${API}/users/${id}`);
		const data = await res.json();

		setEditing(true);
		setId(id);

		setUsers(data);
		console.log('data :>> ', data);
	};

	const handleUsers = e => {
		const { name, value } = e.target;
		setUsers(prevState => ({ ...prevState, [name]: value }));
	};

	return (
		<div className="row ">
			<div className="col-md-4 mt-4">
				<form action="" onSubmit={handleSubmit}>
					<div className="form-group mb-4">
						<input
							type="text"
							onChange={handleUsers}
							value={users.name}
							className="form-control"
							name="name"
							placeholder="Name..."
							autoFocus
						/>
					</div>
					<div className="form-group mb-4">
						<input
							type="email"
							onChange={handleUsers}
							value={users.email}
							className="form-control"
							placeholder="email..."
							name="email"
						/>
					</div>
					<div className="form-group mb-4">
						<input
							type="password"
							onChange={handleUsers}
							value={users.password}
							className="form-control"
							placeholder="password..."
							name="password"
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						{editing ? 'Update' : 'Create'}
					</button>
				</form>
			</div>
			<div className="col-md-6">
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Password</th>
							<th>Operations</th>
						</tr>
					</thead>
					<tbody>
						{drawUsers.map(({ user, email, _id, password }) => (
							<tr key={_id}>
								<th>{user}</th>
								<th>{email}</th>
								<th>{password}</th>
								<td>
									<button
										type="button"
										className="btn btn-secondary btn-sm btn-block"
										onClick={() => editUser(_id)}
									>
										Edit
									</button>
									<button
										type="button"
										className="btn btn-danger btn-sm btn-block"
										onClick={() => deleteUser(_id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Users;
