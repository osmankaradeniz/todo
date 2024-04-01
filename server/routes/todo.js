const express = require("express")
const router = express.Router();

const { verfiyToken } = require("../middlewares/authJWT");
const { getAll, getOne, create, update, destroy, check } = require('../controllers/todo');

router.get('/getAll', verfiyToken, getAll);

router.get('/getOne/:id', verfiyToken, getOne);

router.post('/create', verfiyToken, create);

router.put('/check/:id', verfiyToken, check);

router.put('/update/:id', verfiyToken, update);

router.delete('/delete/:id', verfiyToken, destroy);


router.use("*", (req, res) => {
    res.status(405).json({
        message: "izin verilmeyen yöntem"
    });
})

module.exports = router;