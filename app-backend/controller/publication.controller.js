const  
  Publication = require('../model/db/publication.db'),
  User =  require('../model/db/user.db');

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

//Add postulant
publicationCtrl.addPostulant = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  try {
    await Publication.update({ _id: req.body.publication }, { $push: user }, done );
  } catch (e) {
    return res.json(new ApiResponse('Error al agregar postulante', 400, user, e));
  }
  res.json(new ApiResponse('Postulante agregado', 200, user));
};


module.exports = publicationCtrl;