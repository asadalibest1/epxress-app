
const { db } = require('../DB/DB')
const MongoDb = require('mongodb')
const Bcrypt = require("bcryptjs");
const { token } = require('../Components/token');

class LoginUser {
    async Register(body) {

        const { name, email, password } = body;
        if (!name || !email || !password) {
            return Promise.reject("Plz fill all the fields!!")
        }
        try {

            const match = await db('user').findOne({ email: body.email });

            if (match) return Promise.reject('email already taken!')

            const HashedPassword = await Bcrypt.hashSync(body.password, 10);

            const data = {
                ...body,
                password: HashedPassword,
                created_At: new Date(),
                lastModified: new Date(),
            }

            const res = await db('user').insertOne(data);
            if (res) {
                const result = await db('user').find({ _id: new MongoDb.ObjectId(res.insertedId) }).next();

                return Promise.resolve(result)
            }

        } catch (error) {
            return Promise.reject(error)
        }

    }

    async login(body) {
        const { email, password } = body;
        if (!email || !password) {
            return Promise.reject("Plz fill all the fields!!")
        }
        try {
            const user = await db('user').findOne({ email });
            if (user) {

                const MatchingPasswod = await Bcrypt.compare(password, user.password)
                if (MatchingPasswod) {
                    const Token = await token(user._id);
                    console.log('token', token);

                    return Promise.resolve({
                        id: user._id,
                        Token
                    })
                }
                else {
                    return Promise.reject("password did't matched")
                }
            } else {
                return Promise.reject('email deos not exist!');

            }

        } catch (error) {
            console.log('error', error);

        }

    }

    async Profile(req) {


        try {
            const res = await db('user').findOne({ _id: new MongoDb.ObjectId(req.query.userId) });
            return Promise.resolve(res)

        } catch (error) {
            return Promise.reject("user not found!")
        }

    }

    async ProfileUpdate(body) {

        const { name, email, password, id } = body;

        if (!name && !email && !password) {
            return Promise.reject("Plz enter at least one field!")
        }


        // const verify = await db('user').findOne({ _id: new MongoDb.ObjectId(id) });
        // if (!verify) return Promise.reject('account not found!');

        let obj = {
        };

        body.name && Object.assign(obj, { name: body.name });

        if (body.email) {

            const match = String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );

            if (!match) {
                return Promise.reject({ email: "Invalid email" })
            }

            const emailFound = await db('user').findOne({ email: body.email });

            if (emailFound) {
                return Promise.reject({ email: "email already taken!" })
            } else {
                Object.assign(obj, { email: body.email });
            }

        }
        if (body.password) {
            const HashedPassword = await Bcrypt.hashSync(body.password, 10);
            HashedPassword && Object.assign(obj, { password: HashedPassword });

        }
        try {
            console.log(body);
            await db('user').updateOne({ _id: new MongoDb.ObjectId(body.id) }, { $set: obj });
            return Promise.resolve({ response: "updated" })

        } catch (error) {
            console.error(error)
            return Promise.reject('update failed!')
        }


    }
}

module.exports = new LoginUser();
