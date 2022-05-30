const abc = require('../../Components/dates');
const TransactionModel = require('../../Model/Transaction');
const firebase = require('../../DB/Firebase');

class Transaction {

    add = async (req, res) => {
        try {
            const result = await TransactionModel.Add({ ...req.body, lastModified: new Date(), created_at: new Date() });
            console.log('res', result);
            res.status(200).send(result);
        } catch (error) {
            console.log('error', error);
            res.status(403).json({ Error: error })
        }
    }

    getTransactions = async (req, res) => {
        try {
            const result = await TransactionModel.GetTransactions();
            console.log('res', result);
            res.status(200).send(result);
        } catch (error) {
            console.log('error', error);
            res.status(403).json({ Error: error })
        }
    }

    upload = async (req, res) => {
        try {
            const result = await TransactionModel.Upload({ file: req.file, id: req.query.userId });
            console.log('res', result);
            res.status(200).send(result);
        } catch (error) {
            console.log('error', error);
            res.status(403).json({ Error: error })
        }
    }

    filter = async (req, res) => {
        try {
            const result = await TransactionModel.Filter(req);
            console.log('res', result);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(403).send({ Error: error })
        }
    }

}

module.exports = new Transaction();

