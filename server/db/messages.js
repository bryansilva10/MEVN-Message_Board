const db = require('./connection');
const Joi = require('joi');

const schema = Joi.object().keys({
	username: Joi.string().alphanum().min(3).max(15).required(),
	subject: Joi.string().min(3).max(15).required(),
	message: Joi.string().max(500).required(),
	imageURL: Joi.string().uri({
		scheme: [
			/https?/
		]
	})
})

const messages = db.get('messages');

function getAll() {
	return messages.find();
}

function create(message) {
	//if not username has been set, set it to anonymous
	if (!message.username) {
		message.username = 'Anonymous';
	}
	//check and validate
	const result = Joi.validate(message, schema);
	//if no errors
	if (result.error == null) {
		//add created attribute with date
		message.created = new Date();
		//return insertion to db
		return messages.insert(message)
	} else {
		//return error with validation result
		return Promise.reject(result.error);
	}

}

module.exports = {
	getAll,
	create
}