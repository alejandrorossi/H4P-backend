//Module for data base connection.
const 
  mongoose = require('mongoose'),
  config = require('./config'),
  data = require('./data');


//Direction for connection.
const URI = config.database;

mongoose.connect(URI, {useNewUrlParser: true})
  //Use a promise to see when the database connection is made or see error.
  .then(db => {
    console.log("DB is connected");

    data.loadData()
      .then(t => console.log("La carga de datos iniciales fue correcta."))
      .catch(e => {
        console.log("No se ejecuto con errores la carga de datos iniciales.");
        console.log(e);
      });
  })
  .catch(err => console.error(err));

module.exports = mongoose;