const
  mongoose = require('mongoose'),
  { Schema } = mongoose,
  Comment = require('./comment.db').schema,
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
  comments: {
    type: [Comment],
    default: undefined
  },
  postulants: {
    type: [User],
    default: undefined
  },
  createdDate: { 
    type: Date, 
    default: Date.now 
  } 
});

module.exports = mongoose.model('Publication', publication_schema);