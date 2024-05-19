const express = require('express');
const app = express();
const path = require('path');

const publicDirectoryPath = path.join(__dirname, 'public');


app.use(express.static(publicDirectoryPath));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); 
});


app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000/');
});
