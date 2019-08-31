const 
  mongoose = require('mongoose'),
  { Schema } = mongoose;

//Schema for pet.
var pet_schema = new Schema({
  name: {
    type: String,
    require: true, 
    maxlength:[30,"Nombre muy largo"]
  },
  surname: {
    type: String,
    require: false,
    default: null,
    maxlength:[15,"Apellido muy largo"]
  },
  age: {
    type: Number,
    require: true,
    min: [0, "La edad no puede ser menor que 0"], 
    max: [100, "La edad no puede ser mayor que 100"]
  },
  birth: { 
    type: Date,
    require: true
  },
  type: {
    type: String,
    require: true, 
    maxlength:[30,"Nombre muy largo"]
  },
  characteristics:{
    type: String,
    require: false,
    default: null,
    max: [255, "La cantidad de carácteres maximo es de 255"]
  },
  createdDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Pet', pet_schema);