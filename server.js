const express = require('express');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 9999;
const app = express();

app.use(cors());
app.use(express.static(__dirname, +'public'));
app.use(express.static(`${__dirname}/dist`));
const root = path.resolve(__dirname, 'dist', 'index.html');

app.get('*', (request, response) => {
  response.sendFile(root);
});
app.use(express.static('/'));
app.listen(port);
