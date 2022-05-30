const { db } = require('../DB/DB')
const MongoDb = require('mongodb')
const Bcrypt = require("bcryptjs");
global.XMLHttpRequest = require("xhr2");
const { token } = require('../Components/token');
const admin = require('../DB/Firebase');
const { initializeApp, cert } = require('firebase-admin/app');
// import { getStorage, ref, uploadBytes } from "firebase/storage";



class Transaction {
    Add = async (file) => {
        // if (!name || !email || !password) {
        //     return Promise.reject("Plz fill all the fields!!")
        // }
        console.log('body', file);
        // Promise.resolve(req.body)
        // let payload = body;



        // if (body.image) {
        const timestamp = Date.now();
        const name = file.originalname.split(".")[0];
        const type = file.originalname.split(".")[1];
        const fileName = `${name}_${timestamp}.${'jpg'}`;




        // console.log('uploadTask', uploadTask);
        try {




            const bucket = await admin.storage().bucket().upload(file.originalname, {
                destination: `abc/${file.originalname}`,
                resumable: false,
                metadata: {
                    metadata: {
                        contentType: file.mimetype
                    }
                }
            })
            // const storage = firebase.storage().ref('images/profileImages/xyz');
            // const imageRef = storage.child(fileName);
            // // Step 2. Upload the file in the bucket storage
            // const snapshot = await imageRef.put(file.buffer);
            // // Step 3. Grab the public url
            // const downloadURL = await snapshot.ref.getDownloadURL();
            // console.log(downloadURL);
            // return Promise.resolve(downloadURL);

        } catch (error) {
            console.error(error);
        }

        // try {

        //     const res = await db('transactions').insertOne(payload);
        //     if (!res) return Promise.reject('something went wrong!');

        //     return Promise.resolve(res);

        // } catch (error) {
        //     console.error(error);
        // }

    }
};

module.exports = new Transaction();