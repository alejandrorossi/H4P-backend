const 
  fs = require('fs');

const 
  ApiResponse = require('../model/api.response'),
  Image = require('../model/db/image.db'),
  Img = require('../model/img.model');

const imageCtrl = {}

imageCtrl.getImage = async (req, res) => {
  const img = await Image.findById(req.params.id)

  if(!img) return res.json(new ApiResponse('Imagen no encontrada', 404));
  
  res.json(new ApiResponse('Imagen recuperada', 200, img));
};

imageCtrl.guardarImagen = async (req) => {
  const file = req.file;

  if(file) {
    const img = new Image({
      title: file.originalname,
      path:  file.path
    });

    try{
      const image = await img.save();
      return (new ApiResponse('Imagen guardada', 200, image));
    }catch(e){
      return (new ApiResponse('Imagen no se pudo guardar', 400, img, e));
    }
  }

  return (new ApiResponse('No se recibio ninguna imagen', 400, null));
};

//TODO: eliminar archivo real en servidor.
imageCtrl.eliminarImagenes = async (imagenes) => {
  for (imagen of imagenes) {
    try {
      await Image.deleteOne({ _id: imagen._id });
    } catch (e) {
      console.log(e);
    }
  }
};

module.exports = imageCtrl;