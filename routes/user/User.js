const express = require('express');
const { authenticate } = require('../../Components/authenticate');
const app = express.Router();
const LoginController = require('../../Controllers/User/User')

app.post('/register', LoginController.register);
app.post('/login', LoginController.login);
app.get('/profile', authenticate, LoginController.profile);
app.put('/profileUpdate', authenticate, LoginController.profileUpdate);

module.exports = app;