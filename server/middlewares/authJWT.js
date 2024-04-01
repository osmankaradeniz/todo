var jwt = require("jsonwebtoken");
var User = require("../models/user");


exports.verfiyToken = (req, res, next) => {

    try {

        if (req.headers && req.headers.authorization) {

            if (!req.headers.authorization.split(' ')[0] === 'JWT') {
                return res.status(400).json({
                    message: "token formatı uygunsuz !"
                });
            }

            let decodedJWT = null;

            try {
                decodedJWT = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET_KEY)
            } catch (error) {
                return res.status(401).json({ message: "Geçersiz token !" });
            }

            if (decodedJWT) {
                req.user_id = decodedJWT.user_id;
                next();
            } else {
                return res.status(401).json({ message: "Yetkisiz erişim !" });
            }


        } else {
            return res.status(401).json({ message: "Yetkisiz erişim !" });
        }

    } catch (error) {
        return res.status(400).json({
            message: `Hata : ${error}`
        });
    }


}