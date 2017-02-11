const express = require('express');
const users = require('./controllers/users');
const morgan = require('morgan');

const routes = express.Router();

routes.post('/users', users.createUser);
routes.post('/users/login', users.login);

module.exports = routes;
