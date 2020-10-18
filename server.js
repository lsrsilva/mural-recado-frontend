const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080

app.use(express.static(__dirname + '/dist/mural-recado-frontend'));

app.listen(process.env.PORT || 8080);

// PathLocationStrategy

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/mural-recado-frontend/index.html');
});

app.listen(PORT, () => {
  console.log('Application listening on PORT: ' + PORT);
});
