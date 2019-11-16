const
  mongoose = require('mongoose'),
  Publication = require('../model/db/publication.db'),
  User = require('../model/db/user.db'),
  Application = require('../model/db/application.db');

const ApiResponse = require('../model/api.response');

const publicationCtrl = {}
//Get
publicationCtrl.getPublications = async (req, res) => {
  const publications = await Publication.find({ status: { $ne: 'eliminado' } })
    .populate({ path: 'pet', model: 'Pet', populate: { path: 'user', model: 'User' } })
    .populate({ path: 'applications', model: 'Application', populate: { path: 'user', model: 'User' } });

  res.json(new ApiResponse('Publicaciones encontradas', 200, publications));
};

publicationCtrl.getUserPublications = async (req, res) => {
  const { id } = req.params;

  const publications = await Publication.find({ status: { $ne: 'eliminado' } })
  .populate({ path: 'pet', model: 'Pet', populate: { path: 'user', model: 'User' } })
  .populate({ path: 'applications', model: 'Application', populate: { path: 'user', model: 'User' } });

  let ret = [];
  for (p of publications) {
    if (p.pet.user._id == id)
      ret.push(p)
  }

  res.json(new ApiResponse('Publicaciones encontradas', 200, ret));
};

publicationCtrl.getOtherPublications = async (req, res) => {
  const { id } = req.params;

  const publications = await Publication.find({ status: { $ne: 'eliminado' } })
  .populate({ path: 'pet', model: 'Pet', populate: { path: 'user', model: 'User' } })
  .populate({ path: 'applications', model: 'Application', populate: { path: 'user', model: 'User' } });

  let ret = [];
  for (p of publications) {
    if (p.pet.user._id != id)
      ret.push(p)
  }

  res.json(new ApiResponse('Publicaciones encontradas', 200, ret));
};

publicationCtrl.getPublication = async (req, res) => {
  const publication = await Publication.findById(req.params.id)
  .populate({ path: 'pet', model: 'Pet', populate: { path: 'user', model: 'User' } })
  .populate({ path: 'applications', model: 'Application', populate: { path: 'user', model: 'User' } });

  if (!publication) return res.json(new ApiResponse('Mascota no encontrada', 404, publication));

  res.json(new ApiResponse('Publicacion encontrada', 200, publication));
}

publicationCtrl.createPublication = async (req, res) => {
  const publication = new Publication({
    pet: req.body.pet,
    status: req.body.status
  });

  try {
    await publication.save();
    res.json(new ApiResponse('Publicación guardada', 201, publication));
  } catch (e) {
    res.json(new ApiResponse('Publicación no se pudo guardar', 400, publication, e));
  }
};

publicationCtrl.editPublication = async (req, res) => {
  const
    { id } = req.params,
    publication = {
      status: req.body.status,
      pet: req.body.pet
    };

  try {
    await Publication.updateOne({ _id: id }, { $set: publication }, { new: true });
  } catch (e) {
    return res.json(new ApiResponse('Error al actualizar', 400, publication, e));
  }

  const retPublication = await Publication.findById(id)
  .populate({ path: 'pet', model: 'Pet', populate: { path: 'user', model: 'User' } })
  .populate({ path: 'applications', model: 'Application', populate: { path: 'user', model: 'User' } });
  
  res.json(new ApiResponse('Publicación actualizada', 200, retPublication));
};

publicationCtrl.deletePublication = async (req, res) => {
  const { id } = req.params;

  try {
    const publication = await Publication.updateOne({ _id: id }, { status: 'eliminado' });
    if (!publication) return new ApiResponse('Publicación no encontrada', 404, {}, e);

    res.json(new ApiResponse('Publicación eliminada', 200, publication));
  } catch (e) {
    return res.json(new ApiResponse('Error al eliminar publicación', 400, {}, e));
  }
};

//Add postulant
publicationCtrl.addPostulant = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) new ApiResponse('Usuario no encontrado', 404, {});

    const publication = await Publication.findById(req.body.publication);
    if (!publication) return new ApiResponse('Publicacion no encontrada', 404, {}, e);

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

publicationCtrl.filtrarPublicaciones = async (req, res) => {
  const filtro = req.body.params;
  let query = {};
  let contentQuery = []

  // if (filtro.desde) {
  //   contentQuery.push({ createdDate: { $gte: new Date(filtro.desde) } });
  // } else if (filtro.desde && filtro.hasta) {
  //   quecontentQuery.push({
  //     createdDate: { $gte: new Date(filtro.desde), $lt: new Date(filtro.hasta) } });
  // } else if (filtro.hasta) {
  //   contentQuery.push({ createdDate: { $lt: new Date(filtro.hasta) } });
  // }

  if (filtro.publica && !filtro.privada) {
    contentQuery.push({ status: { $eq: "publico" } });
  } else if (filtro.privada && !filtro.publica) {
    contentQuery.push({ status: { $eq: "privado" } });
  } else {
    contentQuery.push({ status: { $ne: "eliminado" } });
  }

  // TODO: arreglar este filtro
  // if (filtro.especie) {
  //   contentQuery.push({ pet: { type: { $eq: filtro.especie } } });
  // }

  // probar este luego de arreglar el anterior
  // if (filtro.texto) {
  // const val = filtro.texto;

  // query.pet = {
  // description: { $regex: val, $options: 'i' },
  // name: /.*"b".*/ ,
  // age: { $regex: val, $options: 'i' }
  // }
  // }
  query = { $and: contentQuery }
  console.log(query)
  try {
    const publication = await Publication.find(query).populate('pet').find({$and:[{ pet: { type: { $eq: filtro.especie } } }]});

    console.log(publication)
    if (!publication) return new ApiResponse('Publicaciones no encontradas.', 404, {}, e);

    res.json(new ApiResponse('Publicaciones encontradas.', 200, publication));
  } catch (e) {
    // console.log("explota todo")
    console.log(e)
    return res.json(new ApiResponse('Error al filtrar publicaciones.', 400, {}, e));
  }
};

module.exports = publicationCtrl;