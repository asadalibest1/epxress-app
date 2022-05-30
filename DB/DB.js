const MongoClient = require('mongodb').MongoClient;
const { parsed } = require('dotenv').config();

let _db;


const connectDB = async (callback) => {
    try {
        MongoClient.connect(parsed.MONGODB_KEY, (err, client) => {
            _db = client.db('mytestingdb');

            return callback(err)
        })
    } catch (e) {
        throw e
    }
}

const db = (col) => _db.collection(col);

const disconnectDB = () => _db.close()

module.exports = { connectDB, db, disconnectDB }