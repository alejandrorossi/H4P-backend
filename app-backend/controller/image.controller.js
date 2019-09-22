const 
  fs = require('fs');

const 
  ApiResponse = require('../model/api.response'),
  Image = require('../model/db/image.db'),
  Img = require('../model/img.model');

const imageCtrl = {}

imageCtrl.getImage = async (req, res) => {

  try {
    const img = await Image.findById(req.params.id)
    fs.readFile(`${img.path}${img.name}`,'base64',
    (err, data)=>{
      //Si hay un error al leer la imagen.
      if(err) res.json(new ApiResponse('Imagen no se pudo recuperar', 400, img, err));
      //Armamos los datos para el frontend.
      let dataUrl = `data:image/${img.extension};base64, ${data}`;
      //Los guardamos en un objeto nuevo para enviarlo por el response.
      let imgResponse = new Img(img, 'base64', dataUrl);
      res.json(new ApiResponse('Imagen recuperada', 201, imgResponse));
    });
  } catch (e) {
    res.json(new ApiResponse('La imagen no existe', 400, img, e));
  }

};

imageCtrl.createImage = async (req, res) => {

  let img = new Image({
    title: req.body.title,
    name: req.body.name,
    creator: req.body.creator,
    extension: req.body.extension,
    path: req.body.path
  });

  try{
    await img.save();
    res.json(new ApiResponse('Imagen guardada', 201, img));
  }catch(e){
    res.json(new ApiResponse('Imagen no se pudo guardar', 400, img, e));
  }
};


module.exports = imageCtrl;