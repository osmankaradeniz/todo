const Sequelize = require("sequelize");
const db = new Sequelize(
    'todo_demo_db',
    'postgres.hpohsyodwwxssxjdjpqt',
    't8prSaQ06v96b5XT',
    {
        host: 'aws-0-eu-central-1.pooler.supabase.com',
        port: 6543,
        dialect: 'postgres'
    }
);


db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});



module.exports = db;