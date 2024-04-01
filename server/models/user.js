const db = require("../middlewares/database.js");
const { DataTypes } = require("sequelize");

const User = db.define("user", {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
    {
        timestamps: false,
    });

module.exports = User;