const Sequelize = require("sequelize");
const db = new Sequelize(
    'postgres://postgres.hpohsyodwwxssxjdjpqt:t8prSaQ06v96b5XT@aws-0-eu-central-1.pooler.supabase.com:6543/todo_demo_db',
    {
        dialectModule: require('pg'),
    }
);


db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});



module.exports = db;