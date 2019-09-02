
const 
  express = require('express'),
  router = express.Router();

// Imports controllers
const 
  userCtrl = require('./controller/user.controller'),
  petCtrl = require('./controller/pet.controller'),
  publicationCtrl = require('./controller/publication.controller');

// Routes
// USER
router.get('/user', userCtrl.getUsers);
router.post('/user', userCtrl.createUser);
router.get('/user/:id', userCtrl.getUser);
router.put('/user/:id', userCtrl.editUser);
router.delete('/user/:id', userCtrl.deleteUser);
// LOGIN
router.post('/login', userCtrl.getUserForUsernamePassword);

// PET
router.get('/pet', petCtrl.getPets);
router.post('/pet', petCtrl.createPet);
router.get('/pet/:id', petCtrl.getPet);
router.put('/pet/:id', petCtrl.editPet);
router.delete('/pet/:id', petCtrl.deletePet);

// PUBLICATION
router.get('/publication', publicationCtrl.getPublications);
router.post('/publication', publicationCtrl.createPublication);
router.get('/publication/:id', publicationCtrl.getPublication);
router.put('/publication/:id', publicationCtrl.editPublication);
router.delete('/publication/:id', publicationCtrl.deletePublication); 

module.exports = router;