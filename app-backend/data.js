const
  Pet = require('./model/db/pet.db'),
  Publication = require('./model/db/publication.db'),
  User = require('./model/db/user.db'),
  Image = require('./model/db/image.db'),
  Application = require('./model/db/application.db'),
  roles = require('./roles');

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
        "name": "Refu",
        "surname": "Giouno",
        "username": "refugiouno",
        "password": "$2a$10$IUBUd.fkWAnKZ43zfWw.wuHKkyrdotlbMdj1D7xV8ENfIAZNgkfdS",
        "age": 20,
        "email": "refugiouno@gmail.com",
        "roles": roles.getIdsRoles()
      },
      {
        "name": "Casita",
        "surname": "Mascotera",
        "username": "refugiodos",
        "password": "$2a$10$IUBUd.fkWAnKZ43zfWw.wuHKkyrdotlbMdj1D7xV8ENfIAZNgkfdS",
        "age": 20,
        "email": "refugiodos@gmail.com",
        "roles": roles.getIdsRoles()
      },
      {
        "name": "Postu",
        "surname": "Lantero",
        "username": "postulante",
        "password": "$2a$10$IUBUd.fkWAnKZ43zfWw.wuHKkyrdotlbMdj1D7xV8ENfIAZNgkfdS",
        "age": 18,
        "email": "postulanteuno@gmail.com",
        "roles": ["postulante"]
      },
      {
        "name": "Juan",
        "surname": "Elcartero",
        "username": "elcartero",
        "password": "$2a$10$IUBUd.fkWAnKZ43zfWw.wuHKkyrdotlbMdj1D7xV8ENfIAZNgkfdS",
        "age": 32,
        "email": "elcartero@gmail.com",
        "roles": ["postulante"]
      }
    ]);

    console.log("Se insertaron 4 documentos en coleccion: Users");

    const 
      refugiouno = users[0],
      refugiodos = users[1],
      postulante = users[2],
      elcartero = users[3];

    const images = await Image.insertMany(
      [
        {
          "title": "perro-01",
          "name": "HASH-perro-01.jpg",
          "extension": "jpg",
          "creator": refugiouno,
          "path": "/app-backend/public/image"
        },
        {
          "title": "gato",
          "name": "gato.PNG",
          "extension": "PNG",
          "creator": refugiouno,
          "path": "/app-backend/public/image"
        },
        {
          "title": "perro-MIB",
          "name": "perro-MIB.jpg",
          "extension": "jpg",
          "creator": refugiodos,
          "path": "/app-backend/public/image"
        },
        {
          "title": "pajaro-aceventura",
          "name": "pajaro-aceventura.png",
          "extension": "png",
          "creator": refugiodos,
          "path": "/app-backend/public/image"
        },
        {
          "title": "gato-salem",
          "name": "gato-salem.jpg",
          "extension": "jpg",
          "creator": refugiodos,
          "path": "/app-backend/public/image"
        }
      ]);

    console.log("Se inserto 5 documento en coleccion: Images");

    const 
      perro = images[0],
      gato = images[1],
      perro_mib = images[2],
      pajaro_aceventura = images[3],
      gato_salem = images[4];

    const pets = await Pet.insertMany(
      [
        {
          "name": "Tyson",
          "age": 5,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Perro",
          "description": "Es un perro muy guardian",
          "user": refugiouno,
          "images": [perro]
        },
        {
          "name": "Rigoberta",
          "age": 3,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Gato",
          "description": "Una gatita muy buena onda",
          "user": refugiouno,
          "images": [gato]
        },
        {
          "name": "Frank",
          "age": 12,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Perro",
          "description": "Le gusta hablar mucho",
          "user": refugiodos,
          "images": [perro_mib]
        },
        {
          "name": "Loreto",
          "age": 7,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Pajaro",
          "description": "Canta muy bien",
          "user": refugiodos,
          "images": [pajaro_aceventura]
        },
        {
          "name": "Salem",
          "age": 10,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Gato",
          "description": "Buen amigo de brujas",
          "user": refugiodos,
          "images": [gato_salem]
        },
      ]);

    console.log("Se insertaron 5 documentos en coleccion: Pets");

    const 
      tyson = pets[0],
      rigoberta = pets[1],
      frank = pets[2],
      loreto = pets[3],
      salem = pets[4];

    const applications = await Application.insertMany(
      [
        {
          "user": postulante,
          "status": "pendiente"
        },
        {
          "user": elcartero,
          "status": "pendiente"
        }
      ]
    );

    console.log("Se insertaron 5 documento en coleccion: Applications");

    const 
      appl_postulante = applications[0],
      appl_elcartero = applications[1];

    const publications = await Publication.insertMany(
      [
        {
          "pet": tyson,
          "status": "publico"
        },
        {
          "pet": rigoberta,
          "status": "publico",
          "applications": [appl_postulante, appl_elcartero]
        },
        {
          "pet": frank,
          "status": "publico"
        },
        {
          "pet": loreto,
          "status": "privado"
        },
        {
          "pet": salem,
          "status": "privado"
        }
      ]);

    console.log("Se insertaron 5 documento en coleccion: Publications");

  } catch (e) {
    console.log("Ocurrio un error en la carga de datos iniciales.");
    console.log(e);
  }

  console.log("Final de carga de datos iniciales.");
};

module.exports = data;