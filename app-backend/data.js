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
      },
      {
        "name": "Emmanuel",
        "surname": "Pericon",
        "username": "epericon",
        "password": "$2a$10$IUBUd.fkWAnKZ43zfWw.wuHKkyrdotlbMdj1D7xV8ENfIAZNgkfdS",
        "age": 26,
        "email": "epericon@gmail.com",
        "roles": ["postulante"]
      },
      {
        "name": "Alejandro",
        "surname": "Rossi",
        "username": "arossi",
        "password": "$2a$10$IUBUd.fkWAnKZ43zfWw.wuHKkyrdotlbMdj1D7xV8ENfIAZNgkfdS",
        "age": 27,
        "email": "arossi@gmail.com",
        "roles": ["postulante"]
      }
    ]);

    console.log("Se insertaron 4 documentos en coleccion: Users");

    const 
      refugiouno = users[0],
      refugiodos = users[1],
      postulante = users[2],
      elcartero = users[3],
      epericon = users[4],
      arossi = users[5]


    const images = await Image.insertMany(
      [
        {
          "title": "HASH-perro-01.jpg",
          "path": "app-backend/public/uploads/HASH-perro-01.jpg"
        },
        {
          "title": "gato.PNG",
          "path": "app-backend/public/uploads/gato.PNG"
        },
        {
          "title": "perro-MIB.jpg",
          "path": "app-backend/public/uploads/perro-MIB.jpg"
        },
        {
          "title": "pajaro-aceventura.png",
          "path": "app-backend/public/uploads/pajaro-aceventura.png"
        },
        {
          "title": "gato-salem.jpg",
          "path": "app-backend/public/uploads/gato-salem.jpg"
        },
        {
          "title": "don-ramon.jpeg",
          "path": "app-backend/public/uploads/don-ramon.jpeg"
        },
        {
          "title": "et.jpg",
          "path": "app-backend/public/uploads/et.jpg"
        },
        {
          "title": "falcon.jpg",
          "path": "app-backend/public/uploads/falcon.jpg"
        },
        {
          "title": "gato-pero.jpg",
          "path": "app-backend/public/uploads/gato-pero.jpg"
        },
        {
          "title": "GATONTON.jpeg",
          "path": "app-backend/public/uploads/GATONTON.jpeg"
        },
        {
          "title": "gremlin-jopo.jpg",
          "path": "app-backend/public/uploads/gremlin-jopo.jpg"
        },
        {
          "title": "timon.jpg",
          "path": "app-backend/public/uploads/timon.jpg"
        },
        {
          "title": "pumba.jpg",
          "path": "app-backend/public/uploads/pumba.jpg"
        },
        {
          "title": "perro-sorpresa.jpeg",
          "path": "app-backend/public/uploads/perro-sorpresa.jpeg"
        }
      ]);

    console.log("Se inserto 14 documento en coleccion: Images");

    const 
      perro = images[0],
      gato = images[1],
      perro_mib = images[2],
      pajaro_aceventura = images[3],
      gato_salem = images[4],
      don_ramon = images[5],
      et = images[6],
      falcon = images[7],
      gato_pero = images[8],
      gatonton = images[9],
      gremlin_jopo = images[10],
      timon = images[11],
      pumba = images[12],
      perro_sorpresa = images[13];

    const pets = await Pet.insertMany(
      [
        {
          "name": "Tyson",
          "age": 5,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Perro",
          "description": "Es un perro muy guardian",
          "user": refugiouno,
          "images": [perro],
          "createdDate": "2019-11-12T23:14:39.805Z"
        },
        {
          "name": "Rigoberta",
          "age": 3,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Gato",
          "description": "Una gatita muy buena onda",
          "user": refugiouno,
          "images": [gato],
          "createdDate": "2019-05-12T23:14:39.805Z"
        },
        {
          "name": "Frank",
          "age": 12,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Perro",
          "description": "Le gusta hablar mucho",
          "user": refugiodos,
          "images": [perro_mib],
          "createdDate": "2019-11-12T23:14:39.805Z"
        },
        {
          "name": "Loreto",
          "age": 7,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Pajaro",
          "description": "Canta muy bien",
          "user": refugiodos,
          "images": [pajaro_aceventura],
          "createdDate": "2019-11-12T23:14:39.805Z"
        },
        {
          "name": "Salem",
          "age": 10,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Gato",
          "description": "Buen amigo de brujas",
          "user": refugiodos,
          "images": [gato_salem],
          "createdDate": "2019-09-10T23:14:39.805Z"
        },
        {
          "name": "Ramoncito",
          "age": 8,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Otro",
          "description": "Un poco malhumorado",
          "user": refugiodos,
          "images": [don_ramon],
          "createdDate": "2019-09-10T23:14:39.805Z"
        },
        {
          "name": "ETelbino",
          "age": 2,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Otro",
          "description": "No sabe volver a casa solo",
          "user": refugiodos,
          "images": [et],
          "createdDate": "2019-11-12T23:14:39.805Z"
        },
        {
          "name": "Falcon",
          "age": 14,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Perro",
          "description": "Es bueno volando",
          "user": refugiodos,
          "images": [falcon],
          "createdDate": "2019-11-12T23:14:39.805Z"
        },
        {
          "name": "Conteston",
          "age": 3,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Gato",
          "description": "Da buenas respuestas",
          "user": refugiodos,
          "images": [gato_pero],
          "createdDate": "2019-11-12T23:14:39.805Z"
        },
        {
          "name": "Grem",
          "age": 1,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Otro",
          "description": "Cuidado con mojarlo, no es buena idea",
          "user": refugiodos,
          "images": [gremlin_jopo],
          "createdDate": "2019-11-12T23:14:39.805Z"
        },
        {
          "name": "Fito",
          "age": 6,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Perro",
          "description": "Se sorprende facilmente",
          "user": refugiouno,
          "images": [perro_sorpresa],
          "createdDate": "2019-11-12T23:14:39.805Z"
        },
        {
          "name": "Pumba",
          "age": 5,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Otro",
          "description": "Bastante oloroso, le gusta comer bichos",
          "user": refugiouno,
          "images": [pumba],
          "createdDate": "2019-05-01T23:14:39.805Z"
        },
        {
          "name": "Timon",
          "age": 5,
          "birth": "2019-01-01T00:00:00.000Z",
          "type": "Otro",
          "description": "Su lema es HaKuNa MaTaTa",
          "user": refugiouno,
          "images": [timon],
          "createdDate": "2019-05-01T23:14:39.805Z"
        }
      ]);

    console.log("Se insertaron 13 documentos en coleccion: Pets");

    const 
      tyson = pets[0],
      rigoberta = pets[1],
      frank = pets[2],
      loreto = pets[3],
      salem = pets[4],
      ramoncito = pets[5],
      etelbino = pets[6],
      falcon_ = pets[7],
      conteston = pets[8],
      grem = pets[9],
      fito = pets[10],
      pumba_ = pets[11],
      timon_ = pets[12];

    const applications = await Application.insertMany(
      [
        {
          "user": postulante,
          "status": "pendiente"
        },
        {
          "user": elcartero,
          "status": "pendiente"
        },
        {
          "user": epericon,
          "status": "pendiente"
        },
        {
          "user": arossi,
          "status": "pendiente"
        }
      ]
    );

    console.log("Se insertaron 4 documento en coleccion: Applications");

    const 
      appl_postulante = applications[0],
      appl_elcartero = applications[1],
      appl_epericon = applications[2],
      appl_arossi = applications[3];

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
        },
        {
          "pet": ramoncito,
          "status": "publico",
          "applications": [appl_postulante, appl_elcartero, appl_arossi]
        },
        {
          "pet": etelbino,
          "status": "privado"
        },
        {
          "pet": falcon_,
          "status": "publico"
        },
        {
          "pet": conteston,
          "status": "publico",
          "applications": [appl_arossi, appl_epericon]
        },
        {
          "pet": grem,
          "status": "publico"
        },
        {
          "pet": fito,
          "status": "publico"
        },
        {
          "pet": pumba_,
          "status": "publico"
        },
        {
          "pet": timon_,
          "status": "publico"
        }
      ]);

    console.log("Se insertaron 13 documento en coleccion: Publications");

  } catch (e) {
    console.log("Ocurrio un error en la carga de datos iniciales.");
    console.log(e);
  }

  console.log("Final de carga de datos iniciales.");
};

module.exports = data;