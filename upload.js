// upload.js
const multer = require('multer');
const path = require('path');

// Configuración para guardar archivos en disco en la carpeta 'uploads/'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // asegúrate que la carpeta 'uploads' exista
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;