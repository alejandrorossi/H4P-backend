const 
  mongoose = require('mongoose'),
  { Schema } = mongoose,
  Image = require('./image.db').schema;

//Schema for pet.
var pet_schema = new Schema({
  name: {
    type: String,
    require: true, 
    maxlength:[15,"Nombre muy largo"]
  },
  surname: {
    type: String,
    require: false,
    default: "",
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
    default: "",
    max: [255, "La cantidad de carácteres maximo es de 255"]
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