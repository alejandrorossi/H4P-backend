const 
  Pet = require('../model/db/pet.db'),
  User = require('../model/db/user.db');

const 
  fs = require('fs'),
  path = require('path');

const ApiResponse = require('../model/api.response');

const petCtrl = {}

//Get users
petCtrl.getPets = async (req, res) => {
  const pets = await Pet.find().populate('user');
  res.json(new ApiResponse('Mascotas encontradas', 200, pets));
};

petCtrl.getPet = async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if(!pet) return res.json(new ApiResponse('Mascota no encontrada', 404, pet));

  res.json(new ApiResponse('Mascota encontrada', 200, user));
};

petCtrl.createPet = async (req, res) => {

  const pet = new Pet({ 
    name: req.body.name,
    surname: req.body.surname,
    age: req.body.age,
    typeAge: req.body.typeAge,
    birth: req.body.birth,
    type: req.body.type,
    description: req.body.description,
    user: req.body.user
  });

  try{
    await pet.save();
    res.json(new ApiResponse('Mascota guardada', 201, pet));
  }catch(e){
    res.json(new ApiResponse('Mascota no se pudo guardar', 400, pet, e));
  }
};

petCtrl.editPet = async (req, res) => {
  const 
    { id } = req.params,
    pet = {
      name: req.body.name,
      surname: req.body.surname,
      age: req.body.age,
      typeAge: req.body.typeAge,
      birth: req.body.birth,
      type: req.body.type,
      description: req.body.description
    };

  try {
    await Pet.updateOne({ _id: id }, {$set: pet}, {new: true});
  } catch (e) {
    return res.json(new ApiResponse('Error al actualizar', 400, pet, e));
  }

  res.json(new ApiResponse('Mascota actualizada', 200, pet));
};

petCtrl.deletePet = async (req, res) => {
  const { id } = req.params;

  try {
    await Pet.deleteOne({ _id: id });
  } catch (e) {
    return res.json(new ApiResponse('Error al eliminar', 400, {}, e));
  }
  
  res.json(new ApiResponse('Mascota eliminada', 200));
};

module.exports = petCtrl;