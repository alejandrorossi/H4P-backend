const Publication = require('../model/db/publication.db');
const ApiResponse = require('../model/api.response');

const solicitudCtrl = {};

//Get solicitudes
solicitudCtrl.getSolicitudes = async (req, res) => {

  const query = { applications: { $exists: true, $ne: [] } };

  const publicaciones = await Publication.find(query).populate(
    
    {
    path: 'pet',
    model: 'Pet'	

  // }).populate({
  //   path:  'applications',
  //   populate: { path: 'user', model: 'User'}
  }
  ).populate('applications.user');

  if (!publicaciones) new ApiResponse('Publicaciones no encontradas', 404, {});
 
  if(publicaciones.length<1)
    res.json(new ApiResponse('No hay nuevas postulaciones', 200));
  else
    res.json(new ApiResponse('Publicaciones con solicitudes encontradas', 200, publicaciones));
};



module.exports = solicitudCtrl;