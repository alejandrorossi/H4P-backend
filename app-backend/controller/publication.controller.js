const  
  Publication = require('../model/db/publication.db'),
  User =  require('../model/db/user.db'),
  Application = require('../model/db/application.db');

const ApiResponse = require('../model/api.response');

const publicationCtrl = {}

//Get users
publicationCtrl.getPublications = async (req, res) => {
  const publications = await Publication.find()
  .populate({
    path: 'pet',
    model: 'Pet',		
    populate: { 
      path:  'user',
      model: 'User'
    }
  });

  res.json(new ApiResponse('Publicaciones encontradas', 200, publications));
};

publicationCtrl.getPublication = async (req, res) => {
};

publicationCtrl.createPublication = async (req, res) => {
  const publication = new Publication({ 
    pet: req.body.pet,
    status: req.body.status
  });

  try{
    await publication.save();
    res.json(new ApiResponse('Publicación guardada', 201, publication));
  }catch(e){
    res.json(new ApiResponse('Publicación no se pudo guardar', 400, publication, e));
  }
};

publicationCtrl.editPublication = async (req, res) => {
};

publicationCtrl.deletePublication = async (req, res) => {
};

//Add postulant
publicationCtrl.addPostulant = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) new ApiResponse('Usuario no encontrado', 404, {});

    const publication =  await Publication.findById(req.body.publication);
    if(!publication) return new ApiResponse('Publicacion no encontrada', 404, {}, e);

    let application = new Application({
      user: user
    });
    await application.save();

    publication.applications.push(application);
    await publication.save();
    
    res.json(new ApiResponse('Postulante agregado', 200, publication));
  } catch (e) {
    return res.json(new ApiResponse('Error al agregar postulante', 400, {}, e));
  }
};

module.exports = publicationCtrl;