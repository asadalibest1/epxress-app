const express = require('express');
const app = express.Router();
const TransactionController = require('../../Controllers/Transactions/Transactions')
const { authenticate } = require('../../Components/authenticate');

const multer = require('multer')
const upload = multer({
    storage: multer.memoryStorage()
})
app.post('/add', authenticate, TransactionController.add);
app.post('/upload', authenticate, upload.single("file"), TransactionController.upload);
app.get('/getTransactions', authenticate, TransactionController.getTransactions);
app.post('/filter', TransactionController.filter);

module.exports = app;