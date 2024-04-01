const express = require("express")
const db = require("./middlewares/database.js");
const models = require('./models/models.js');
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");
const cors = require("cors");
require("dotenv").config();

app = express();

app.use(
    cors({
        origin: '*'
    })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/user", userRoutes);
app.use("/todo", todoRoutes);



app.use("*", (req, res) => {
    res.status(404).json({
        message: "servis bulunamadı !"
    });
})


db.sync({ force: true }).then(() => {
    console.log('tables created successfully!');
}).catch((error) => {
    console.error('Unable to create tables : ', error);
});



app.listen(process.env.PORT || 3002, () => {
    console.log("Server is live on port 3002");
})

