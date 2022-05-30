const app = require('../../DB/DB')
const UserModel = require('../../Model/User');
class Login {

    async register(req, res) {
        try {

            const result = await UserModel.Register(req.body);
            console.log('result', result);
            return await res.status(200).json(result);

        } catch (error) {

            // if (err == "InvalidP") {
            //     return res.status(403).json({ Error: "Invalid Password" })
            // }
            console.log('err controller', error);
            res.status(403).json({ Error: error })

        }
    }

    async login(req, res) {
        try {

            const result = await UserModel.login(req.body);
            console.log('result', result);
            return await res.status(200).json(result);

        } catch (error) {

            // if (err == "InvalidP") {
            //     return res.status(403).json({ Error: "Invalid Password" })
            // }
            console.log('err controller', error);
            res.status(403).json({ Error: error })

        }
    }

    async profile(req, res) {
        try {
            const result = await UserModel.Profile(req);
            console.log('result', result);
            return await res.status(200).json(result);

        } catch (error) {

            console.log('profile controller', error);
            res.status(403).json({ Error: error })

        }
    }

    async profileUpdate(req, res) {
        try {
            const body = { ...req.body, id: req.query.userId, lastModified: new Date() }
            const result = await UserModel.ProfileUpdate(body);
            console.log('result', result);
            return await res.status(200).json(result);

        } catch (error) {

            // if (err == "InvalidP") {
            //     return res.status(403).json({ Error: "Invalid Password" })
            // }
            console.log('err controller', error);
            res.status(403).json({ Error: error })

        }
    }

}


module.exports = new Login();
