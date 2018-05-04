const express = require('express');
// const knex = require('knex');
const router = express.Router();
const db = require('../knex/knex.js');


router.route('/')
.get((req, res) => {
  // console.log('initial request', req);
  return db.raw('SELECT * FROM products')
  .then((data) => {
    console.log('!!DATA FROM DB.RAW!!', data); 
    if(data.rows){
      res.send(data.rows);
    }else{
      res.send('no products in database');
    };
  })
  .catch((err) => {
    console.log('!!ERROR FROM DB!!', err);
    res.send('no products in database');
  });
})






module.exports = router; 