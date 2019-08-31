//Module for data base connection.
const mongoose = require('mongoose'),
  config = require('./config');

//Direction for connection.
const URI = config.database;

mongoose.connect(URI, {useNewUrlParser: true})
  //Use a promise to see when the database connection is made or see error.
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));

module.exports = mongoose;