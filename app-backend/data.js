const 
  Pet = require('./model/db/pet.db'),
  Publication = require('./model/db/publication.db'),
  User = require('./model/db/user.db'),
  Image = require('./model/db/image.db'),
  Application = require('./model/db/application.db');

const data = {}

data.loadData = async (req, res) => {

  console.log("Comienzo de carga de datos iniciales.");
  
  try {
    await Pet.deleteMany();
    await Publication.deleteMany();
    await User.deleteMany();
    await Image.deleteMany();
    await Application.deleteMany();

    const users = await User.insertMany(
    [
      {
        "name": "refugio",
        "surname": "refugio",
        "username": "refugio",
        "password": "$2a$10$IUBUd.fkWAnKZ43zfWw.wuHKkyrdotlbMdj1D7xV8ENfIAZNgkfdS",
        "age": 18,
        "email": "refugio@gmail.com"
      },
      {
        "name": "postulante",
        "surname": "postulante",
        "username": "postulante",
        "password": "$2a$10$IUBUd.fkWAnKZ43zfWw.wuHKkyrdotlbMdj1D7xV8ENfIAZNgkfdS",
        "age": 20,
        "email": "postulante@gmail.com"
      }
    ]);
  
    console.log("Se insertaron 2 documentos en coleccion: Users");

    const user = users[0];

    const images = await Image.insertMany(
    [
      {
        "title": "perro-01",
        "name": "HASH-perro-01.jpg",
        "extension": "jpg",
        "creator": user,
        "path": "/app-backend/public/image"
      }
    ]);

    console.log("Se inserto 1 documento en coleccion: Images");

    const image = images[0];

    const pets = await Pet.insertMany(
    [
      {
        "name":"Tyson",
        "age": 5,
        "birth": "2019-01-01T00:00:00.000Z",
        "type":"Perro",
        "description": "Es un perro muy guardian",
        "user": user,
        "images": [image]
      }, 
      {
        "name":"Lula",
        "age": 3,
        "birth": "2019-01-01T00:00:00.000Z",
        "type":"Gato",
        "characteristics": "Una gatita muy mimosa",
        "user": user
      }
    ]);

    console.log("Se insertaron 2 documentos en coleccion: Pets");

    const pet = pets[0];

    const publications = await Publication.insertMany(
    [
      {
        "pet": pet
      }
    ]);
    
    console.log("Se inserto 1 documento en coleccion: Publications");
  } catch (e) {
    console.log("Ocurrio un error en la carga de datos iniciales.");
    console.log(e);    
  }

  console.log("Final de carga de datos iniciales.");
};

module.exports = data;