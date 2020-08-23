const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const messages = require('./db/messages');

const app = express();
const port = process.env.PORT || 1234;

//middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

//routes
//GET ROUTE
app.get('/', (req, res) => {
	res.json({
		message: 'Message Board'
	})
})

app.get('/messages', (req, res) => {
	messages.getAll().then(messages => {
		res.json(messages);
	})
})

app.post('/messages', (req, res) => {
	messages.create(req.body).then(message => {
		res.json(message);
	}).catch(err => {
		res.status(500).json(err);
	});
})

app.listen(port, () => {
	console.log(`Listening on Port: ${port}`);
})
