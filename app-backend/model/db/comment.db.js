const 
  mongoose = require('mongoose'),
  { Schema } = mongoose;

//Schema for user.
var comment_schema = new Schema({
  user:{
    type: Schema.Types.ObjectId, 
    ref: "User"
  },
  text: {
    type: String,
    require: true, 
    maxlength:[255,"Comentario muy extenso"]
  },
  createdDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Comment', comment_schema);