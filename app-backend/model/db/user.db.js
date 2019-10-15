const 
  mongoose = require('mongoose'),
  { Schema } = mongoose;

//Validation for mail.
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Formato de imail inválido"];

//Schema for user.
var user_schema = new Schema({
  name: {
    type: String,
    require: true, 
    maxlength:[15,"El nombre debe ser menor a 15 carácteres"]
  },
  surname: {
    type: String,
    require: true, 
    maxlength:[15,"El apellido debe ser menor a 15 carácteres"]
  },
  username: {
    type: String,
    require: true, 
    maxlength:[10,"El nombre de usuario debe ser menor a 10 carácteres"]
  },
  password: {
    type: String,
    require: true, 
    minlength:[8,"La contraseña debe ser mayor a 8 carácteres"],
    select: false
  },
  age: {
    type: Number,
    require: true,    
    min: [18, "La edad no puede ser menor que 18"], 
    max: [100, "La edad no puede ser mayor que 100"]
  },
  email: {
    type: String, 
    require: true, 
    match: email_match
  },
  createdDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', user_schema);