const express = require('express');
const bodyParser = require('body-parser'); 
const knex = require('./knex/knex.js');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000; 

// app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/', routes);

app.listen(PORT, (err) => {
  console.log(`server running on ${PORT}`);
});