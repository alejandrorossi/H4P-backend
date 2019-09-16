const Pet = require('../model/db/pet.db');

const ApiResponse = require('../model/api.response');

const petCtrl = {}

//Get users
petCtrl.getPets = async (req, res) => {
  const pets = await Pet.find().populate('user');
  res.json(new ApiResponse('Mascotas encontradas', 200, pets));
};

petCtrl.getPet = async (req, res) => {
  const pet = await User.findById(req.params.id);
  if(!pet) return res.json(new ApiResponse('Usuario no encontrado', 404, pet));

  res.json(new ApiResponse('Usuario encontrado', 200, user));
};

petCtrl.createPet = async (req, res) => {

  let img = undefined;  
  if(req.body.imagen){
    img = new Image({
      title: req.body.imagen.title,
      creator: req.body.imagen.creator,
      extension: req.body.imagen.extension,
      path: req.body.imagen.path
    });
  }

  const pet = new Pet({ 
    name: req.body.name,
    surname: req.body.surname,
    age: req.body.age,
    birth: req.body.birth,
    type: req.body.type,
    characteristics: req.body.characteristics,
    imagen: img
  });

  try{
    await pet.save();
    res.json(new ApiResponse('Mascota guardada', 201, pet));
  }catch(e){
    res.json(new ApiResponse('Mascota no se pudo guardar', 400, pet, e));
  }
};

petCtrl.editPet = async (req, res) => {
  const { id } = req.params;
  const pet = {
    name: req.body.name,
    surname: req.body.surname,
    age: req.body.age,
    birth: req.body.birth,
    type: req.body.type,
    characteristics: req.body.characteristics
  };

  try {
    await Pet.findByIdAndUpdate(id, {$set: pet}, {new: true});
  } catch (e) {
    return res.json(new ApiResponse('Error al actualizar', 400, pet, e));
  }

  res.json(new ApiResponse('Mascota actualizada', 200, user));
};

petCtrl.deletePet = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
  } catch (e) {
    return res.json(new ApiResponse('Error al eliminar', 400, {}, e));
  }
  res.json(new ApiResponse('Mascota eliminada', 200));
};

module.exports = petCtrl;