const express = require("express")
const router = express.Router();

const { register, login } = require('../controllers/user');

router.post('/register', register);

router.post('/login', login);



router.use("*", (req, res) => {
    res.status(405).json({
        message: "izin verilmeyen yöntem"
    });
})

module.exports = router;