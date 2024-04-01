const Joi = require('joi');
const Todo = require('../models/todo.js');


const schema = Joi.object().keys({
    time: Joi.string().required().messages({
        'any.required': `"time" zorunlu bir alandır.`
    }),
    text: Joi.string().required().messages({
        'any.required': `"text" zorunlu bir alandır.`
    })
});

exports.getAll = async (req, res) => {
    try {

        const todos = await Todo.findAll({
            where: {
                user_id: req.user_id,
            },
            order: [['createdAt', 'ASC']]
        });

        if (!todos) {
            return res.status(400).json({
                data: null
            })
        }

        return res.status(200).json({
            data: todos
        })

    } catch (error) {
        return res.status(400).json({
            message: `Hata : ${error}`
        });
    }

};

exports.getOne = async (req, res) => {

    try {

        const todo = await Todo.findOne({
            where: {
                todo_id: req.params.id,
                user_id: req.user_id
            }
        });

        if (!todo) {
            return res.status(400).json({
                data: null
            })
        }

        return res.status(200).json({
            data: todo
        })

    } catch (error) {
        return res.status(400).json({
            message: `Hata : ${error}`
        });
    }

};


exports.create = async (req, res) => {

    try {

        const validate = schema.validate(req.body, { abortEarly: false });

        if (validate.error) {
            return res.status(400).json({
                message: validate.error
            });
        }

        const { time, text } = req.body


        await Todo.create({
            time: time,
            text: text,
            user_id: req.user_id
        }).then((result, error) => {
            if (error) {
                res.status(400)
                    .send({
                        message: `Kayıt başarısız. ${error}`
                    });
                return;
            } else {
                res.status(201)
                    .send({
                        user_id: result.user_id,
                        message: "Kayıt başarılı."
                    })
            }
        });

    } catch (error) {
        return res.status(400).json({
            message: `Hata : ${error}`
        });
    }

};


exports.update = async (req, res) => {

    try {

        const validate = schema.validate(req.body, { abortEarly: false });

        if (validate.error) {
            return res.status(400).json({
                message: validate.error
            });
        }

        const { time, text } = req.body

        const todo = await Todo.findOne({
            where: {
                todo_id: req.params.id,
                user_id: req.user_id
            }
        });

        if (!todo) {
            return res.status(400).json({
                message: `Kayıt bulunamadı.`
            })
        }

        todo.time = time;
        todo.text = text;


        todo.save()
            .then((result) => {
                res.status(201)
                    .send({
                        todo_id: result.todo_id,
                        message: "Güncelleme başarılı."
                    })
            })
            .catch((error) => {
                res.status(400).send({
                    message: `Güncelleme başarısız. ${error}`
                });
            });

    } catch (error) {
        return res.status(400).json({
            message: `Hata : ${error}`
        });
    }

};

exports.check = async (req, res) => {

    try {

        const todo = await Todo.findOne({
            where: {
                todo_id: req.params.id,
                user_id: req.user_id
            }
        });

        if (!todo) {
            return res.status(400).json({
                message: `Kayıt bulunamadı.`
            })
        }

        todo.checked = !todo.checked;

        todo.save()
            .then((result) => {
                res.status(201)
                    .send({
                        todo_id: result.todo_id,
                        message: "Tamamlandı olarak işaretleme işlemi başarılı !"
                    })
            })
            .catch((error) => {
                res.status(400).send({
                    message: `Tamamlandı olarak işaretleme işlemi başarısız !`
                });
            });

    } catch (error) {
        return res.status(400).json({
            message: `Hata : ${error}`
        });
    }

};


exports.destroy = async (req, res) => {
    try {
        const todo = await Todo.findOne({
            where: {
                todo_id: req.params.id,
                user_id: req.user_id
            }
        });

        if (!todo) {
            return res.status(400).json({
                message: `Kayıt bulunamadı.`
            });
        }

        await todo.destroy();

        res.status(200).send({
            todo_id: todo.todo_id,
            message: "Silme başarılı."
        });
    } catch (error) {
        return res.status(400).json({
            message: `Hata : ${error}`
        });
    }
};
