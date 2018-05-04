const express = require('express');

const router = express.Router();

router.route('/:user_id')
  .get((req, res) => {
    let findUser = knex.raw(select(req.params.user_id).from('users'));
    if (!findUser) {
      res.send({ message: 'User not found' });
    } else {
      res.send(findUser);
    };
  });

router.route('/login')
  .post((req, res) => {
    let findEmail = knex.raw(select(req.body.email).from('users'));
    let findPassword = knex.raw(select(req.body.password).from('users'));
    if (!findEmail) {
      res.json({ "message": "User not found" });
    } else if (!findPassword) {
      res.json({ "message": "Incorrect password" });
    }
  })