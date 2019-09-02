const Publication = require('../model/db/publication.db');

const ApiResponse = require('../model/api.response');

const publicationCtrl = {}

//Get users
publicationCtrl.getPublications = async (req, res) => {
  const publis = await Publication.find().populate('user').populate('pet');
  res.json(new ApiResponse('Publicaciones encontradas', 200, publis));
};

publicationCtrl.getPublication = async (req, res) => {
};

publicationCtrl.createPublication = async (req, res) => {
  const pub = new Publication({ 
    pet: req.body.pet,
    user: req.session.user_id
  });

  try{
    await pub.save();
    res.json(new ApiResponse('Publicación guardada', 201, pub));
  }catch(e){
    res.json(new ApiResponse('Publicación no se pudo guardar', 400, pub, e));
  }
};

publicationCtrl.editPublication = async (req, res) => {
};

publicationCtrl.deletePublication = async (req, res) => {
};

module.exports = publicationCtrl;