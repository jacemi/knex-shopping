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
.put((req, res) => {
  return db.raw('SELECT * FROM products WHERE id = ?', [req.params.id])
  .then((data) => {
    console.log('REQUEST BODY BEFORE', req.body);
    console.log("DATA!", data.rows[0]);
    for (const key in req.body){
      if(!req.body[key]){
        req.body[key] = data.rows[0][key];
      }
    };
    console.log('REQ BODY AFTER', req.body);
    return db.raw('UPDATE products SET title = ?, description = ?, inventory = ?, price = ? WHERE id = ? RETURNING * ', [req.body.title, req.body.description, req.body.inventory, req.body.price, req.params.id])
    .then((data) => {
      console.log('UPDATE DATA', data);
      res.send({ "message": "Product has been updated" });
    })
    .catch((err) => {
      console.log('UPDATE ERROR', err);
      res.send("Product update was unsuccessful");
    })
  })
  .catch((err) => {
    console.log('SELECT ERROR', err);
    res.send("Product update was unsuccessful")
  })
})
.delete((req, res) => {
  let id = req.params.id;
  return db.raw('DELETE FROM products WHERE products.id = ? RETURNING * ', [id])
    .then((data) => {
      if (data.rows[0].id) {
        res.json({ "message": "Product successfully deleted" });
      } else {
        throw { "message": "Product not found" };
      }
    })
    .catch((err) => {
      console.log('!!ERROR FROM ID DELETE!!', err);
      res.json({ "message": "Product not found" });
    })
})

router.route('/new')
.post((req, res) => {
  return db.raw('INSERT INTO products(title, description, inventory, price) VALUES (?, ?, ?, ?) RETURNING * ', [req.body.title, req.body.description, req.body.inventory, req.body.price])
  .then((data) => {
    console.log('!!DATA!!', data);
    if(data.rows[0].title){
      if(data.rows[0].description){
        if(data.rows[0].inventory){
          if(data.rows[0].price !== '$0.00'){
            res.send(data.rows[0]);
          }else{
            throw { "message": "Must POST all product fields" }
          }
        }else{
          throw { "message": "Must POST all product fields" }
        }
      }else{
        throw { "message": "Must POST all product fields" }
      }
    }else{
      throw { "message": "Must POST all product fields" }
    }
  })
  .catch((err) => {
    console.log('!!ERROR!!', err);
    res.send({ "message": "Must POST all product fields" });
  })
})







module.exports = router; 