const express = require('express');
// const knex = require('knex');
const router = express.Router();
const db = require('../knex/knex.js');


router.route('/:id')
  .get((req, res) => {
    let id = req.params.id; 
    console.log('!!USERS ID!!', id);
     return db.raw('SELECT * FROM users WHERE users.id = ?', [id])
      .then((data) => {
        console.log('!!DATA!!', data);
        if(data.rows[0].id){
          res.send(data.rows[0]);
        }else{
          throw { message: 'User not found' };
        }
      })
      .catch ((err) => { 
        console.log('!!ERROR FROM ID DELETE!!', err);
        res.json({ message: 'User not found' });
      })
  })
  .delete((req, res) => {
    let id = req.params.id;
    return db.raw('DELETE FROM users WHERE users.id = ? RETURNING * ', [id])
    .then((data) => {
      if(data.rows[0].email){
        res.json({ "message": "User id successfully deleted" });
      }else{
        res.json({ "message": "User ID not found" });
      }
    })
    .catch ((err) => {
      console.log('!!ERROR FROM ID DELETE!!', err);
      res.json({ "message": "User ID not found" });
    })
  });

router.route('/login')
  .post((req, res) => {
    return db.raw('SELECT email, password FROM users WHERE users.email = ? AND users.password = ?', [req.body.email, req.body.password])
      .then((data) => {
        if(data.rows[0].email){
          if(data.rows[0].password){
            res.send(data.rows[0]);
          }else{
            res.json({ "message": "Incorrect password" });
          }
        }else{
          res.json({ "message": "User not found" });
        };
      })
      .catch ((err) => {
        console.log('!!ERROR FROM LOGIN POST!!', err);
        res.json({ "message": "User not found" });
      });
  })

router.route('/register')
  .post((req, res) => {
    const lowerCaseEmail = (req.body.email).toLowerCase();
    return db.raw('INSERT INTO users(email, password) VALUES (?, ?) RETURNING * ', [lowerCaseEmail, req.body.password])
      .then((data) => {
        console.log(data);
        if(data.rows[0].email){
          res.send(data.rows[0]);
        }else{
          res.json({ "message": "User already exists" });
        }
      })
      .catch ((err) => {
        console.log('!!ERROR FROM REGISTER POST!!', err);
        res.json({ "message": "User already exists" });
      });
  });

router.route('/:id/forgot-password')
  .put((req, res) => {
    console.log('req.body.password', req.body.password, 'req.params.user_id', req.params.id);
    return db.raw('UPDATE users SET password = ? WHERE id = ? RETURNING * ', [req.body.password, req.params.id])
    .then((data) => {
      if(data.rows[0].password){
        res.json({ "message": "New password created!" }); 
      }else{
        res.json({"message": "Password change unsuccessful"});
      }
    })
    .catch ((err) => {
      console.log('!!ERROR FROM PASSWORD UPDATE!!', err);-
      res.json({ "message": "Password change unsuccessful" });
    });
  });


// router.route('/login')
//   .post((req, res) => {
//     let findEmail = knex.raw(select(req.body.email).from('users'));
//     let findPassword = knex.raw(select(req.body.password).from('users'));
//     if (!findEmail) {
//       res.json({ "message": "User not found" });
//     } else if (!findPassword) {
//       res.json({ "message": "Incorrect password" });
//     }
//   })

module.exports = router; 

