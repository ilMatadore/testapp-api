const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

const database = {
	users: [
		{
			id: '123',
			first_name: 'John',
			last_name: 'Ramone',
			email: 'john@gmail.com',
			password: 'cookies',
			joined: new Date()
		},
		{
			id: '124',
			first_name: 'Sally',
			last_name: 'Dee',
			email: "sally@gmail.com",
			password: 'bananas',
			joined: new Date()
		}
	]
}

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/',(req, res) => {
	res.json(database.users);
})

app.post('/',(req, res) => {
	if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
		res.json('Success!');
	} else {
		res.status(400).json('Error Logging in');
	}
})

app.post('/register', (req, res) => {
	const { email, first_name, last_name, password } = req.body;
	database.users.push({
		id: '125',
		first_name: first_name,
		last_name: last_name,
		email: email,
		password: password,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true;
			return res.json(user);
		} 
	})
	if (!found) {
		res.status(404).json('No such user');
	}
})

app.listen(3000, () => {
	console.log('app is running on port 3000');
});