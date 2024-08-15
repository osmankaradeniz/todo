const Sequelize = require("sequelize");
const db = new Sequelize(
<<<<<<< HEAD
    'postgres://postgres.hpohsyodwwxssxjdjpqt:t8prSaQ06v96b5XT@aws-0-eu-central-1.pooler.supabase.com:6543/todo_demo_db',
    {
        dialectModule: require('pg'),
=======
    'todo_demo_db',
    'postgres.hpohsyodwwxssxjdjpqt',
    't8prSaQ06v96b5XT',
    {
        host: 'aws-0-eu-central-1.pooler.supabase.com',
        port: 6543,
        dialect: 'postgres'
>>>>>>> 66a9b37b13991dc71f7deb4465b04cdd0a958609
    }
);


db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});



module.exports = db;