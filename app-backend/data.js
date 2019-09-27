const 
  Pet = require('./model/db/pet.db'),
  Publication = require('./model/db/publication.db'),
  User = require('./model/db/user.db'),
  Image = require('./model/db/image.db');

const data = {}

data.loadData = async (req, res) => {

  await Pet.deleteMany();
  await Publication.deleteMany();
  await User.deleteMany();
  await Image.deleteMany();

  let pet, user, image;

  User.insertMany([
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
  ], 
  function(err, result) {
    console.log("Se insertaron 2 documentos en coleccion: Users");

    user = result[0];

    Image.insertMany([
      {
        "title": "perro-01",
        "name": "HASH-perro-01.jpg",
        "extension": "jpg",
        "creator": user,
        "path": "/app-backend/public/image"
      }
    ], 
    function(err, result) {
      console.log("Se inserto 1 documento en coleccion: Images");

      image = result[0];

      Pet.insertMany([
        {
          "name":"Tyson",
          "age": 5,
          "birth": "2019-01-01T00:00:00.000Z",
          "type":"Perro",
          "characteristics": "Es un perro muy guardian",
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
      ], 
      function(err, result) {
        console.log("Se insertaron 2 documentos en coleccion: Pets");
    
        pet = result[0];
    
        Publication.insertMany([
          {
            "pet": pet
          }
        ],
        function(err, result) {
          console.log("Se inserto 1 documento en coleccion: Publications");
        });
      });

    });
  });
};

module.exports = data;