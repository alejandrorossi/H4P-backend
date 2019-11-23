
const
  express = require('express'),
  router = express.Router();

// Imports controllers
const
  userCtrl = require('./controller/user.controller'),
  petCtrl = require('./controller/pet.controller'),
  publicationCtrl = require('./controller/publication.controller'),
  imageCtrl = require('./controller/image.controller'),
  solicitudCtrl = require('./controller/solicitud.controller');

// Routes
// USER
router.get('/user', userCtrl.getUsers);
router.post('/user', userCtrl.createUser);
router.get('/user/:id', userCtrl.getUser);
router.put('/user/:id', userCtrl.editUser);
router.delete('/user/:id', userCtrl.deleteUser);
router.put('/user/notification', userCtrl.editUser);

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
router.get('/publication/user/:id', publicationCtrl.getUserPublications);
router.get('/publication/other/:id', publicationCtrl.getOtherPublications);
router.post('/publication', publicationCtrl.createPublication);
router.get('/publication/:id', publicationCtrl.getPublication);
router.put('/publication/:id', publicationCtrl.editPublication);
router.delete('/publication/:id', publicationCtrl.deletePublication);
router.post('/publication/:id', publicationCtrl.addPostulant);
router.post('/publication/buscarFiltradas', publicationCtrl.filtrarPublicaciones);

// IMAGE
router.get('/image/:id', imageCtrl.getImage);
router.post('/image', imageCtrl.createImage);

// SOLICITUDES
router.get('/solicitud/:id', solicitudCtrl.getSolicitudes);
router.get('/solicitudesAceptadas/:id', solicitudCtrl.getSolicitudesAceptadas);
router.get('/solicitudesPendientes/:id', solicitudCtrl.getSolicitudesPendientes);
router.put('/aceptarSolicitud/:id', solicitudCtrl.putAceptarSolicitante);
router.put('/rechazarSolicitud/:id', solicitudCtrl.putRechazarSolicitante);

module.exports = router;