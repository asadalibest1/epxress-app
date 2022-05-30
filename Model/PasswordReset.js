
const { db } = require('../DB/DB')
const MongoDb = require('mongodb')
const Bcrypt = require("bcryptjs");
const { token } = require('../Components/token');
const Mail = require('../Components/SendMail');
require("dotenv").config({ path: './auth.env' });

class PasswordModel {
    async SendCode(req) {

        const { email } = req.body;
        if (!email) {
            return Promise.reject("email is required!")
        }
        try {

            const match = await db('passwords').findOne({ email });

            if (!match) return Promise.reject('email not found!')

            const otp = Math.floor(100000 + Math.random() * 900000);
            console.log(otp)

            const obj = {
                otp,
                expireToken: Date.now() + 3600000
            }
            console.log('process.env.email', process.env.email);

            const seendCode = await db('passwords').updateOne(
                { email },
                { $set: { email, otp, created_At: new Date() } },
            );

            // await Mail.sendMail({
            //     // to: email,
            //     to: 'asadali48245@gmail.com',
            //     from: { name: 'Testing Expres App', address: process.env.email },
            //     subject: "Password Reset Request",
            //     service: "gmail",
            //     html: `
            //         <p>You requested for password reset</p>
            //         <p>Your OTP Code is ${otp}</p>
            //     `

            // })
            return Promise.resolve({ message: "Check your Mail" })

            // const HashedPassword = await Bcrypt.hashSync(body.password, 10);


            // const res = await db('user').insertOne({ ...body, password: HashedPassword });
            // if (res) {
            //     const result = await db('user').find({ _id: new MongoDb.ObjectId(res.insertedId) }).next();

            //     return Promise.resolve(result)
            // }

        } catch (error) {
            return Promise.reject(error)
        }

    }

    async MatchCode(req) {
        const { email } = req.body;
        if (!email) {
            return Promise.reject("email is required!")
        }
        const { otp } = req.query;
        try {
            const user = await db('passwords').findOne({ email });
            if (!user) return Promise.reject('not found!');
            // console.log('user.otp', user.otp, Number(otp));
            if (user.otp === Number(otp)) {
                return Promise.resolve({ result: 'code matched' });
            } else {
                return Promise.reject("code did't matched");

            }

        } catch (error) {
            console.log('error', error);
            return Promise.reject("email is required!")
        }

    }
}

module.exports = new PasswordModel();
