const ApiResponse = require('../model/api.response');

module.exports = function(req, res, next){
  if(!req.session.user_id){ 
    return res.json(new ApiResponse('Debe iniciar sesión', 200)); 
  }

  next();
}