const monk = require('monk');
const connectionString = 'mongodb+srv://admin-bryan:bryanpass@cluster0-mnqtb.mongodb.net/message-board?retryWrites=true&w=majority';

const db = monk(connectionString);

module.exports = db;