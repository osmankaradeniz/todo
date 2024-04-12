const Sequelize = require("sequelize");
const db = new Sequelize(
    'todo_db_6kue',
    'abc',
    'def',
    {
        host: 'ghj',
	port: 5432,
        dialect: 'postgres'
    }
);


db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});



module.exports = db;
