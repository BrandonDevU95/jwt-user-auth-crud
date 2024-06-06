const express = require('express');
const AdminController = require('../controllers/admin');
const { userAuth } = require('../middlewares/authenticated');
const { isAdmin } = require('../middlewares/credentials');

const api = express.Router();

api.get('/admin/users', [userAuth, isAdmin], AdminController.getUsers);
api.post('/admin/user', [userAuth, isAdmin], AdminController.createUser);
api.patch('/admin/user/:id', [userAuth, isAdmin], AdminController.updateUser);
api.delete('/admin/user/:id', [userAuth, isAdmin], AdminController.deleteUser);

module.exports = api;
