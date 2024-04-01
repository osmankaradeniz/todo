const Sequelize = require("sequelize");
const db = new Sequelize(
    'todo_db',
    'ronesans2',
    '1234',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);


db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});



module.exports = db;