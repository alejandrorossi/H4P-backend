const
  mongoose = require('mongoose'),
  { Schema } = mongoose,
  status = ["publico", "privado", "eliminado"];

var publication_schema = new Schema({
  pet:{
    type: Schema.Types.ObjectId, 
    ref: "Pet"
  },
  applications: { 
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application'
    }],
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