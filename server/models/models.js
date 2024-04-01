const User = require('./user');
const Todo = require('./todo');

User.hasMany(Todo, { foreignKey: 'user_id' });
Todo.belongsTo(User, { foreignKey: 'user_id' });



const models = {
    User,
    Todo
}

module.exports = models;