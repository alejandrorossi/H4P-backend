const Publication = require('../model/db/publication.db');
const ApiResponse = require('../model/api.response');

const solicitudCtrl = {};

//Get solicitudes
//añadir que no hayan sido adoptados
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

  const { id } = req.params; //id de usuario que viaja en url, deberia ser mejor la de application
  const { idPublicacion } = req.body;

  // mandar application ? mejor, cambiar el id de usuario al de application
  // propiedad de "adoptado" a nivel publicación que sea un booleano?
  // o recorrer la lista de application viendo si alguno tiene estado aceptado_

  const status = "aceptado";

  //   try {
  //     const aplicationUpd = await Application.updateOne({ _id: id }, {$set: status}, {new: false});
  //   } catch (e) {
  //     return res.json(new ApiResponse('Error al actualizar', 400, user, e));
  //   }

  res.json(new ApiResponse('Usuario aceptado', 200, {}));
};





module.exports = solicitudCtrl;