const 
  Pet = require('../model/db/pet.db'),
  User = require('../model/db/user.db'),
  ImageController = require('../controller/image.controller'),
  Image = require('../model/db/image.db');

const 
  fs = require('fs'),
  bcrypt = require('bcryptjs');

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

  res.json(new ApiResponse('Mascota encontrada', 200, pet));
};

petCtrl.createPet = async (req, res) => {
  //Primero se guardan las imagenes
  let images = await guardarImagenes(req);
  const mascota = JSON.parse(req.body.mascota);

  let pet = new Pet(mascota);
  pet.images = images;
  
  try{
    await pet.save();
    res.json(new ApiResponse('Mascota guardada', 201, pet));
  }catch(e){
    res.json(new ApiResponse('Mascota no se pudo guardar', 400, pet, e));
  }
};

petCtrl.editPet = async (req, res) => {
  //Primero se guardan las imagenes
  let images = await guardarImagenes(req);

  const
    { id } = req.params,
    mascota = JSON.parse(req.body.mascota);

  let pet = new Pet(mascota);

  //Esto es para NO perder las imagenes cuando no se cambia
  //la que ya posee cuando editamos la mascota.
  const prevPet = await Pet.findById(req.params.id);
  if(images.length > 0){
    pet.images = images;
    ImageController.eliminarImagenes(prevPet.images);
  }
  else
    pet.images = prevPet.images;

  try {
    await Pet.updateOne({ _id: id }, {$set: pet});
  } catch (e) {
    return res.json(new ApiResponse('Error al actualizar', 400, pet, e));
  }

  const retPet = await Pet.findById(id).populate('user');
  res.json(new ApiResponse('Mascota actualizada', 200, retPet));
};

async function guardarImagenes(req) {
  let images = [];
  
  try {
    let res = await ImageController.guardarImagen(req);
    if(res.data)
      images.push(res.data);
  } catch (error) {
    res.json(new ApiResponse('Error al guardar imagenes', 400, {}, e));
  }

  return images;
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