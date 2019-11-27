//Load the express module.
const 
  express = require('express'),
  app = express();

//Import connection for MongoDB
const { mongoose } = require('./db.connection');

//Extra modules.
const 
  morgan = require('morgan'),//module for view in console web petitions.
  cors = require('cors'),//module for communication between servers.
  session = require("express-session"),//module for session driver
  bodyParser = require("body-parser"),//module for body request parser
  path = require('path');

// const session_middleware = require("./middleware/session.middleware");
  
//SETTINGS
const 
  config = require('./config'),
  port = config["server-port"];

app.set('port', port);

//MIDDLEWARES
//This is for the server to understand the data, and later to be able to use req.body
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
//Use Morgan module
app.use(morgan('dev'));
//Use session driver
app.use(session({
  secret: "123asd",
  resave: false,
  saveUninitialized : false
}));

//Cors is a middleware, so we add it with .use() and also 
//the connection configuration with the Angular server.
app.use(cors({origin: 'http://localhost:4200'}));

//Use middleware for session control
//app.use("/app/publication", session_middleware);

//This folder for this app will be used to store public files
app.use('/app-backend/public/uploads', express.static(path.join(__dirname, '/public/uploads')));

//ROUTES  
app.use('/app', require('./app.router'));

//Starting the server.
app.listen(app.get('port'), () => {
  console.log('listening on port '+ app.get('port') +'...');
});