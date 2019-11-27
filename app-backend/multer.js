
const
  multer = require('multer'),
  uuid = require('uuid/v4'),
  path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    if(file)
      cb(null, 'app-backend/public/uploads');
  },
  // destination: 'app-backend/public/uploads',
  filename: (req, file, callback) => {
    if(file)
      callback(null, uuid() + path.extname(file.originalname));
    // else
    //   next();
  }
});

module.exports = multer({storage});