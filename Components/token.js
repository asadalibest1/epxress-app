const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.token = (id) => {
    console.log(id, id.toJSON());
    return jwt.sign(id.toJSON(), process.env.SECRET_KEY);
}
