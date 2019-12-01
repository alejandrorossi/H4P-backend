const 
  Publication = require('../model/db/publication.db'),
  ApiResponse = require('../model/api.response'),
  Application = require('../model/db/application.db');

const solicitudCtrl = {};

//saca a los que tengan un acetado
solicitudCtrl.getSolicitudesPendientes = async (req, res) => {
  const query = { 'applications.status': { $nin: ["aceptado"] }, applications: { $exists: true, $ne: [] } };

  requestSolicitudes(query, req, res);
};

solicitudCtrl.getSolicitudesAceptadas = async (req, res) => {
  const query = { applications: { $exists: true, $ne: [], $elemMatch: { status: "aceptado" } } };
  requestSolicitudes(query, req, res);
};

solicitudCtrl.getSolicitudes = async (req, res) => {
  const query = { applications: { $exists: true, $ne: [] } };
  requestSolicitudes(query, req, res);
};

async function requestSolicitudes(query, req, res) {
  const { id } = req.params;
  let ret = [];

  const publicaciones = await Publication.find(query);

  publicaciones.forEach(function (p, indice, array) {
    if (p.pet.user._id == id)
      ret.push(p)
  });

  if (!ret) new ApiResponse('Publicaciones no encontradas', 404, {});

  if (publicaciones.length < 1)
    res.json(new ApiResponse('No hay nuevas postulaciones', 200));
  else
    res.json(new ApiResponse('Publicaciones con solicitudes encontradas', 200, ret));
}

solicitudCtrl.putAceptarSolicitante = async (req, res) => {

  const { id } = req.params; //application id
  const { idPublicacion } = req.body.idPublicacion;

  // const pub = await Publication.updateOne(
  //   { _id: idPublicacion, "applications._id": id },
  //   { $set: { "applications.$.status": "aceptado" } }
  // )
  try {
    await Application.updateOne({ _id: id }, { $set: { status: 'aceptado' } }, { new: true });
  } catch (e) {
    return res.json(new ApiResponse('Error al aceptar usuario', 400, {}, e));
  }

  const retPublication = await Publication.findById(idPublicacion)
    .populate({ path: 'pet', model: 'Pet', populate: { path: 'user', model: 'User' } })
    .populate({ path: 'applications', model: 'Application', populate: { path: 'user', model: 'User' } });
  
  res.json(new ApiResponse('Usuario aceptado', 200, retPublication));
};

solicitudCtrl.putRechazarSolicitante = async (req, res) => {

  const { id } = req.params;
  const { idPublicacion } = req.body.idPublicacion;

  // const retPublication = await Publication.updateOne(
  //   { _id: idPublicacion, 'applications._id': id },
  //   { $set: { 'applications.$.status': 'rechazado' } }
  // )

  try {
    await Application.updateOne({ _id: id }, { $set: { status: 'rechazado' } }, { new: true });
  } catch (e) {
    return res.json(new ApiResponse('Error al rechazar usuario', 400, {}, e));
  }

  const retPublication = await Publication.findById(idPublicacion)
    .populate({ path: 'pet', model: 'Pet', populate: { path: 'user', model: 'User' } })
    .populate({ path: 'applications', model: 'Application', populate: { path: 'user', model: 'User' } });
  
  res.json(new ApiResponse('Usuario rechazado', 200, retPublication));
};

module.exports = solicitudCtrl;