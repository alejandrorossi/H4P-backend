const 
  mongoose = require('mongoose'),
  { Schema } = mongoose;

//Validation for mail.
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Coloca un email válido"];

//Schema for user.
var user_schema = new Schema({
  name: {
    type: String,
    require: true, 
    maxlength:[30,"Nombre muy largo"]
  },
  surname: {
    type: String,
    require: true, 
    maxlength:[15,"Apellido muy largo"]
  },
  username: {
    type: String,
    require: true, 
    maxlength:[10,"Username muy largo"]
  },
  password: {
    type: String,
    require: true, 
    minlength:[8,"El password es muy corto"]
  },
  age: {
    type: Number,
    require: true,    
    min: [5, "La edad no puede ser menor que 5"], 
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