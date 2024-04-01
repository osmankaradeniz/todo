const Joi = require('joi');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");

const schema = Joi.object().keys({
    username: Joi.string().required().messages({
        'any.required': `"username" zorunlu bir alandır.`
    }),
    password: Joi.string().required().messages({
        'any.required': `"password" zorunlu bir alandır.`
    }),
});

exports.register = async (req, res) => {

    try {

        const validate = schema.validate(req.body, { abortEarly: false });

        if (validate.error) {
            return res.status(400).json({
                message: validate.error
            });
        }

        const { username, password } = req.body


        const user = await User.findOne({
            where: {
                username: username
            }
        })

        if (user) {
            return res.status(400).json({
                message: "Bu kullanıcı adı zaten kayıtlı."
            })
        }
        else {

            await User.create({
                username: username,
                password: bcrypt.hashSync(password, 8)
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

        }

    } catch (error) {
        return res.status(400).json({
            message: `Hata : ${error}`
        });
    }
}


exports.login = async (req, res) => {

    try {

        const validate = schema.validate(req.body, { abortEarly: false });

        if (validate.error) {
            return res.status(400).json({
                message: validate.error
            });
        }

        const { username, password } = req.body


        const user = await User.findOne({
            where: {
                username: username
            }
        })

        if (!user) {
            return res.status(400).json({
                message: "Kullanıcı bulunamadı !"
            })
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({
                token: null,
                message: "Hatalı şifre !"
            })
        }

        const token = jwt.sign(
            { user_id: user.user_id, username: user.username },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 3600 }
        );


        res.status(200)
            .json({
                user: {
                    user_id: user.user_id,
                    username: user.username
                },
                token: `JWT ${token}`,
                message: "Kayıt başarılı."
            })

    } catch (error) {
        return res.status(400).json({
            message: `Hata : ${error}`
        });
    }
}

