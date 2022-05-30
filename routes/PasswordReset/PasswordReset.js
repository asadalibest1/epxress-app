const express = require('express');
const app = express.Router();
const PasswordController = require('../../Controllers/PasswordReset/PasswordReset')
const { authenticate } = require('../../Components/authenticate');


app.post('/sendCode', authenticate, PasswordController.sendCode);
app.post('/matchCode', authenticate, PasswordController.matchCode);

module.exports = app;