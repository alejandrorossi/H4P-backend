const Publication = require('../model/db/publication.db');
const ApiResponse = require('../model/api.response');

const solicitudCtrl = {};

solicitudCtrl.getSolicitudes = async (req, res) => {

  const query = { applications: { $exists: true, $ne: [] } };

  const publicaciones = await Publication.find(query).populate(
    {
      path: 'pet',
      model: 'Pet'
    }
  ).populate('applications.user');

  if (!publicaciones) new ApiResponse('Publicaciones no encontradas', 404, {});

  if (publicaciones.length < 1)
    res.json(new ApiResponse('No hay nuevas postulaciones', 200));
  else
    res.json(new ApiResponse('Publicaciones con solicitudes encontradas', 200, publicaciones));
};


solicitudCtrl.putAceptarSolicitante = async (req, res) => {

  const { id } = req.params; //application id
  const { idPublicacion } = req.body;

  const pub = await Publication.updateOne(
    { _id: idPublicacion, "applications._id": id },
    { $set: { "applications.$.status": "aceptado" } }
  )

  res.json(new ApiResponse('Usuario aceptado', 200, pub));
};

solicitudCtrl.putRechazarSolicitante = async (req, res) => {

  const { id } = req.params; 
  const { idPublicacion } = req.body;

  const pub = await Publication.updateOne(
    { _id: idPublicacion, "applications._id": id },
    { $set: { "applications.$.status": "rechazado" } }
  )

  res.json(new ApiResponse('Usuario rechazado', 200, pub));
};




module.exports = solicitudCtrl;