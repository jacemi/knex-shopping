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
      throw 'no products in database';
    };
  })
  .catch((err) => {
    console.log('!!ERROR FROM DB!!', err);
    res.send('no products in database');
  });
})

router.route('/:id')
.get((req, res) => {
  let id = req.params.id
  return db.raw('SELECT * FROM users WHERE users.id = ?', [id])
  .then((data) => {
    if(data.rows[0].id){
      res.send(data.rows[0])
    }else{
      throw { "message": "Product not found" };
    }
    console.log('!!DATA FROM ID!!', data);
  })
  .catch((err) => {
    console.log('!!ERROR FROM ID!!', err);
    res.send({ "message": "Product not found" });
  })
})






module.exports = router; 