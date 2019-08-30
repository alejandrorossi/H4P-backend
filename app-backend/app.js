//Load the express module.
const 
  express = require('express'),
  app = express();
  
//SETTINGS
const port = 8080;
app.set('port', port);

//MIDDLEWARES
//This is for the server to understand the data, and later to be able to use req.body
app.use(express.json());

//ROUTES
app.use('/app', require('./app.router'));

//Starting the server.
app.listen(app.get('port'), () => {
  console.log('listening on port '+ app.get('port') +'...');
});