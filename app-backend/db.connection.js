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
    console.log('DB is connected');

    data.loadData()
      .then(t => console.log("Se ejecuto bien loadData"))
      .catch(e => console.log("No se ejecuto bien loadData: "+ e));
  })
  .catch(err => console.error(err));

module.exports = mongoose;