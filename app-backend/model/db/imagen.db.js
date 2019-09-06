const 
  mongoose = require('mongoose'),
  { Schema } = mongoose;

var img_schema = new Schema({
  title:{
    type:String, 
    require:true
  },
  creator:{
    type: Schema.Types.ObjectId, 
    ref: "User"
  },
  extension:{
    type:String, 
    require:true
  },
  path:{
    type: String,
    require: true
  },
  createdDate: { 
    type: Date, 
    default: Date.now 
  }
});

var Imagen = mongoose.model("Imagen", img_schema);

module.exports = Imagen;