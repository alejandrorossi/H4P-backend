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
        "name": "refugio",
        "surname": "refugio",
        "username": "refugio",
        "password": "$2a$10$IUBUd.fkWAnKZ43zfWw.wuHKkyrdotlbMdj1D7xV8ENfIAZNgkfdS",
        "age": 18,
        "email": "refugio@gmail.com",
        "roles": roles.getIdsRoles()
      },
      {
        "name": "nombre-post",
        "surname": "apellido-post",
        "username": "postulante",
        "password": "$2a$10$IUBUd.fkWAnKZ43zfWw.wuHKkyrdotlbMdj1D7xV8ENfIAZNgkfdS",
        "age": 20,
        "email": "postulante@gmail.com",
        "roles": ["postulante"]
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
        },
        {
          "title": "gato-01",
          "name": "gato.PNG",
          "extension": "PNG",
          "creator": user,
          "path": "/app-backend/public/image"
        }
      ]);

    console.log("Se inserto 1 documento en coleccion: Images");

    const image = images[0];

    const pets = await Pet.insertMany(
      [
        {
          "name": "Tyson",
          "age": 5,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Perro",
          "description": "Es un perro muy guardian, fue creado en noviembre.",
          "user": user,
          "images": [image],
          "createdDate": "2019-11-12T23:14:39.805Z"
        },
        {
          "name": "Rigoberta",
          "age": 3,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Gato",
          "description": "Una gatita muy buena onda, fue creado en mayo.",
          "user": user,
          "images": images[1],
          "createdDate": "2019-05-12T23:14:39.805Z"
        },
        {
          "name": "Tyson II",
          "age": 5,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Perro",
          "description": "Este no es nada guardian, fue creado en septiembre.",
          "user": user,
          "images": [image],
          "createdDate": "2019-09-12T23:14:39.805Z"
        },
      ]);

    console.log("Se insertaron 2 documentos en coleccion: Pets");

    const pet = pets[0];

    const publications = await Publication.insertMany(
      [
        {
          "pet": pet,
          status: "publico"
        },
        {
          "pet": pets[1],
          status: "publico"

        },
        {
          "pet": pets[2],
          status: "privado"
        }
      ]);

    console.log("Se insertaron 2 documento en coleccion: Publications");
  } catch (e) {
    console.log("Ocurrio un error en la carga de datos iniciales.");
    console.log(e);
  }

  console.log("Final de carga de datos iniciales.");
};

module.exports = data;