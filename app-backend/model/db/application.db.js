const
  mongoose = require('mongoose'),
  { Schema } = mongoose,
  status = ["pendiente", "aceptado", "rechazado"];

  var application_schema = new Schema({
    user:{
      type: Schema.Types.ObjectId, 
      ref: "User"
    },
    status: {
      type: String, 
      enum: status,
      default: status[0]
    },
    createdDate: { 
      type: Date, 
      default: Date.now 
    } 
  });
  
  module.exports = mongoose.model('Application', application_schema);