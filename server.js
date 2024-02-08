const express = require('express');
const cors = require('cors');

const CLIENT_ID = 'c4957071de12ba95c479';
const CLIENT_SECRET = 'a7b3541e8b1e1f220de0f039abf9a0d7be04591d';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/getAccessToken', async (req, res) => {
	const { code } = req.query;

	const params =
		'?client_id=' +
		CLIENT_ID +
		'&client_secret=' +
		CLIENT_SECRET +
		'&code=' +
		code;
	try {
		console.log(params);
		const response = await fetch(
			'https://github.com/login/oauth/access_token' + params,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
				},
			}
		);
		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.log(error);
		res.json({ error: error.message });
	}
});

// get user data
// accesstoken is going to be passed as authorization header

app.get('/getUserData', async (req, res) => {
	const authData = req.get('Authorization');
	try {
		const response = await fetch('https://api.github.com/user', {
			method: 'GET',
			headers: {
				Authorization: authData,
			},
		});
		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.log(error);
		res.json({ error: error.message });
	}
});

app.listen(4000, () => {
	console.log('Server is running on port 4000');
});
