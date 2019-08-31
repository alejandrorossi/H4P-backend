
const 
  express = require('express'),
  router = express.Router();

// Imports controllers
const userCtrl = require('./controller/user.controller');

// Routes
// USER
router.get('/user', userCtrl.getUsers);
router.post('/user', userCtrl.createUser);
router.get('/user/:id', userCtrl.getUser);
router.put('/user/:id', userCtrl.editUser);
router.delete('/user/:id', userCtrl.deleteUser);

// LOGIN
router.post('/login', userCtrl.getUserForUsernamePassword);

module.exports = router;