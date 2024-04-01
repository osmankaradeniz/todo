const Sequelize = require("sequelize");
const db = new Sequelize(
    'todo_db_6kue',
    'ronesans2',
    'reWiR9kct248ujXC040qrw3cRC90gwNs',
    {
        host: 'dpg-co556o4f7o1s7398740g-a',
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