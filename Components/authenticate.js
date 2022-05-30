const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticate = async (req, res, next) => {

    try {
        let headerToken = await req.headers["authorization"];
        headerToken = req.headers.authorization.split(' ')[1];


        try {
            const verify = await jwt.verify(headerToken, process.env.SECRET_KEY);
            console.log('verify', verify)
            if (verify === req.query.userId) {
                next()
            } else {
                res.status(403).send({ Error: "invalid id!" })
            }
        }
        catch (e) {
            res.status(403).send({ Error: "invalid token!" })

        }



    } catch (error) {
        console.error('err', error);
        res.status(403).send({ Error: "unauthorized" })
    }
}