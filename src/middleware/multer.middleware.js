const multer = require('multer')
const fs = require('fs');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public/temp')
  },
  filename: function (req, file, cb) {
//    console.log(file)
//    return;
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storage })
module.exports = upload 