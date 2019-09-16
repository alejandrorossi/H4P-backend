const
  mongoose = require('mongoose'),
  { Schema } = mongoose,
  User = require('./user.db').schema;
  status = ['inprogress', 'finished'];

//Schema for user.
var publication_schema = new Schema({
  pet:{
    type: Schema.Types.ObjectId, 
    ref: "Pet"
  },
  postulants: {
    type: [User],
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