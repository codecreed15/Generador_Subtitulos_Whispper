const express = require('express');
const cors = require('cors');
const upload = require('./upload');
const {exec} = require('child_process')
const path = require('path');

const app = express();
const port = 3000;



// Permitir solicitudes CORS desde cualquier origen (solo para desarrollo)
// app.use(cors());

// O permitir sólo desde tu frontend en localhost:5173:
// app.use(cors({ origin: 'http://localhost:5173' }));

// app.get('/', (req, res) => {
//   res.send('Servidor Express funcionando');
// });

// app.post('/upload', upload.single('video'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No se recibió ningún archivo' });
//   }

//   res.json({ message: 'Video recibido correctamente', filename: req.file.filename });
// });

function convertirAudio() {
  const ffmpegPath = path.join(__dirname, 'FFMPEG','ffmpeg.exe')
const inputVideo = path.join(__dirname, 'uploads','prueba.mp4')
const outputDir = path.join(__dirname,'uploads', 'output', 'pruebaDesdeNodeJS.mp3');
const cmd = `"${ffmpegPath}" -i "${inputVideo}" "${outputDir}" `

  console.log('⏳ Ejecutando FFmpeg...');
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error en la conversión:', error.message);
      return;
    }
    console.log('✅ Conversión completa:',outputDir);
  });
}

app.listen(port, () => {
convertirAudio() 

  console.log(`Servidor corriendo en http://localhost:${port}`);
});