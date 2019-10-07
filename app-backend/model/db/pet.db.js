const 
  mongoose = require('mongoose'),
  { Schema } = mongoose,
  Image = require('./image.db').schema,
  typeAge = ['D', 'M', 'A'];

//Schema for pet.
var pet_schema = new Schema({
  name: {
    type: String,
    require: true, 
    maxlength:[15,"El nombre debe ser menor a 15 carácteres"]
  },
  surname: {
    type: String,
    require: false,
    default: "",
    maxlength:[15,"El apellido debe ser menor a 15 carácteres"]
  },
  age: {
    type: Number,
    require: true,
    min: [0, "La edad no puede ser menor que 0"], 
    max: [100, "La edad no puede ser mayor que 100"]
  },
  typeAge: {
    type: String,
    enum: typeAge,
    required: true,
    default: typeAge[1]
  },
  birth: { 
    type: Date,
    require: true
  },
  type: {
    type: String,
    require: true, 
    maxlength:[15,"El tipo debe ser menor a 15 carácteres"]
  },
  description:{
    type: String,
    require: false,
    default: "",
    max: [500, "La cantidad de carácteres maximo es de 500"]
  },
  images:{
    type: [Image],
    default: []
  },
  user:{
    type: Schema.Types.ObjectId, 
    ref: "User"
  },
  createdDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Pet', pet_schema);