  //This controller is data manager of the database
//Import user model to consult database.
const User = require('../model/db/user.db');

const
  bcrypt  =  require('bcryptjs')//module to hash password

const
  ApiResponse = require('../model/api.response');

const userCtrl = {}

//Get users
userCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(new ApiResponse('Usuarios encontrados', 200, users));
};

//Post a user
userCtrl.createUser = async (req, res) => {
  const user = new User({ 
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    password:  bcrypt.hashSync(req.body.password),
    age: req.body.age,
    email: req.body.email
  });

  try{
    await user.save();
    res.json(new ApiResponse('Usuario guardado', 201, user));
  }catch(e){
    res.json(new ApiResponse('Usuario no se pudo guardar', 400, user, e));
  }
};

//Get a user
userCtrl.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if(!user) return res.json(new ApiResponse('Usuario no encontrado', 404, user));

  res.json(new ApiResponse('Usuario encontrado', 200, user));
};

//Method for login
userCtrl.getUserForUsernamePassword = async (req, res) => {
  let findValue; //Permitimos iniciar sesion con email o con nombre de usuario.
  if(req.body.username.includes('@'))
    findValue = { email: req.body.username };
  else
    findValue = { username: req.body.username };

  try {
    const user = await User.findOne(findValue);
    if(!user) return res.json(new ApiResponse('Usuario/e-mail no encontrado', 404, {}, 'Error:'));
    
    //Validate password
    const result = bcrypt.compareSync(req.body.password, user.password);
    if(!result) return res.json(new ApiResponse('Contraseña incorrecta', 400, {}, 'Error:'));
    
    //Save user in session
    req.session.user_id = user._id;
    
    res.json(new ApiResponse('Usuario logueado', 200, user));
  } catch (e) {
    return res.json(new ApiResponse('Error en el servidor', 500, user, e));
  }
};

//Put a user
userCtrl.editUser = async (req, res) => {
  const 
    { id } = req.params,
    user = {
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      password: req.body.password,
      age: req.body.age,
      email: req.body.email
    };

  try {
    const userUpdated = await User.updateOne({ _id: id }, {$set: user}, {new: true});
  } catch (e) {
    return res.json(new ApiResponse('Error al actualizar', 400, user, e));
  }

  res.json(new ApiResponse('Usuario actualizado', 200, user));
};

//DEL a user
userCtrl.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.deleteOne({ _id: id });
  } catch (e) {
    return res.json(new ApiResponse('Error al eliminar', 400, {}, e));
  }
  
  res.json(new ApiResponse('Usuario eliminado', 200));
};

module.exports = userCtrl;