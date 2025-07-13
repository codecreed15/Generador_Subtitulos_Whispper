function extractAudio(direccion, file) {
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