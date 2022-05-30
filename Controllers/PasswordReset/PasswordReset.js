const { dates, mdate } = require('../../Components/dates');
const app = require('../../DB/DB')
const PasswordModel = require('../../Model/PasswordReset');

class PasswordController {


    async sendCode(req, res) {
        try {

            const result = await PasswordModel.SendCode(req);
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

    async matchCode(req, res) {
        try {

            const result = await PasswordModel.MatchCode(req);
            console.log('result', result);
            return await res.status(200).json(result);

        } catch (error) {

            console.log('err controller', error);
            res.status(403).json({ Error: error })

        }
    }



}

module.exports = new PasswordController();
