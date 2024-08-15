const db = require("../middlewares/database.js");
const { DataTypes } = require("sequelize");

const Todo = db.define("todo", {
    todo_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    checked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
},
    {
        timestamps: true,
        tableName: 'todo'
    }
);

module.exports = Todo;