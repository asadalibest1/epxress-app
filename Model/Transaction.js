const { db } = require('../DB/DB')
// const MongoDb = require('mongodb')
// const Bcrypt = require("bcryptjs");
global.XMLHttpRequest = require("xhr2");
// const { token } = require('../Components/token');
const firebase = require('../DB/FirebaseAdmin');
const path = require('path');


class Transaction {
    Add = async (body) => {
        // const { name, email, password } = body;
        // if (!name || !email || !password) {
        //     return Promise.reject("Plz fill all the fields!!")
        // }
        try {
            const result = await db('transactions').insertOne(body);
            console.log('result', result);
            return Promise.resolve(result);

        } catch (error) {
            console.log('error', error);

            return Promise.reject(error);

        }

    }

    GetTransactions = async (body) => {
        try {
            const result = await db('transactions').find({}).toArray();
            console.log('result', result);
            return Promise.resolve(result);

        } catch (error) {
            console.log('error', error);

            return Promise.reject(error);

        }

    }

    Filter = async (req) => {
        const { description, date, sort } = req.body;

        if (description != undefined && date != undefined && sort != undefined) {
            try {
                const result = await db('transactions').find({ description, date: { $gte: date } }).sort({ description: sort, date: sort }).toArray();
                console.log('result', result);
                return Promise.resolve(result);

            } catch (error) {
                console.log('error', error);

                return Promise.reject(error);

            }
        }

        else if (description != undefined && date != undefined && sort == undefined) {
            try {
                const result = await db('transactions').find({ description, date: { $gte: date } }).toArray();
                console.log('result', result);
                return Promise.resolve(result);

            } catch (error) {
                console.log('error', error);

                return Promise.reject(error);

            }
        }
        else if (description != undefined && sort != undefined) {
            try {
                const result = await db('transactions').find({ description }).sort({ description: sort }).toArray();
                console.log('result', result);
                return Promise.resolve(result);

            } catch (error) {
                console.log('error', error);

                return Promise.reject(error);

            }
        }

        else if (description != undefined && sort == undefined) {
            try {
                const result = await db('transactions').find({ description }).toArray();
                console.log('result', result);
                return Promise.resolve(result);

            } catch (error) {
                console.log('error', error);

                return Promise.reject(error);

            }
        }
        else if (date != undefined && sort != undefined) {
            try {
                const result = await db('transactions').find({ date: { $gte: date } }).sort({ date: sort }).toArray();
                console.log('result', result);
                return Promise.resolve(result);

            } catch (error) {
                console.log('error', error);

                return Promise.reject(error);

            }
        }

        else if (date != undefined && sort == undefined) {
            try {
                const result = await db('transactions').find({ date: { $gte: date } }).toArray();
                console.log('result', result);
                return Promise.resolve(result);

            } catch (error) {
                console.log('error', error);

                return Promise.reject(error);

            }
        }
    }

    Upload = async ({ file, id }) => {
        return new Promise((resolve, reject) => {

            if (!file) {
                return reject("File Not Found")
                //  res.status(400).send("Error: No files found")
            } else {
                const fileToupload = file.originalname;
                const type = path.extname(fileToupload);
                console.log(type);
                const urlName = `${Math.random()}${type}`;
                const newFileName = `${id}/${urlName}`;

                const blob = firebase.bucket.file(newFileName)


                // console.log(fileToupload)

                const blobWriter = blob.createWriteStream({

                    metadata: {
                        metadata: {
                            contentType: file.mimetype,
                            firebaseStorageDownloadTokens: id,
                        }
                    },
                })


                blobWriter.on('error', (err) => {
                    console.log(err);
                    return reject("Error in Blob")
                })

                blobWriter.on('finish', () => {

                    const url = `https://firebasestorage.googleapis.com/v0/b/${firebase.bucket.name}/o/${id}%2F${urlName}?alt=media&token=${id}`;
                    // console.log(url);

                    resolve({ url, type: file.mimetype })

                })

                blobWriter.end(file.buffer)
            }

        })


    }


    
};

module.exports = new Transaction();