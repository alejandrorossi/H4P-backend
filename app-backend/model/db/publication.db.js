const
  mongoose = require('mongoose'),
  { Schema } = mongoose,
  User = require('./user.db').schema;

//Schema for user.
var publication_schema = new Schema({
  pet:{
    type: Schema.Types.ObjectId, 
    ref: "Pet"
  },
  user:{
    type: Schema.Types.ObjectId, 
    ref: "User"
  },
  postulants: {
    type: [User],
    default: []
  },
  createdDate: { 
    type: Date, 
    default: Date.now 
  } 
});

module.exports = mongoose.model('Publication', publication_schema);