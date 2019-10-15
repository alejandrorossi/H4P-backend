const
  mongoose = require('mongoose'),
  { Schema } = mongoose,
  Application = require('./application.db').schema,
  status = ["publico", "privado", "eliminado"];

var publication_schema = new Schema({
  pet:{
    type: Schema.Types.ObjectId, 
    ref: "Pet"
  },
  applications: {
    type: [Application],
    default: []
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

module.exports = mongoose.model('Publication', publication_schema);