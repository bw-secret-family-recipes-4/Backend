const router = require('express').Router();
const bcrypt = require('bcrypt');

const Users = require('../users/user-model.js');
const { isValid, signToken } = require('../users/user-service.js');

router.post('/register', (req, res) => {
    const credentials = req.body

    if(isValid(credentials)){
      const rounds = 8
      const hash = bcrypt.hashSync(credentials.password, rounds)
      credentials.password = hash
        Users.add(credentials)
          .then(user => {
            res.status(201).json({ data: user })
          })
          .catch(error => {
            res.status(500).json({ message: error.message })
          })
      } else {
        res.status(400).json({ message: "please provide username and password "})
      }
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    if(isValid(req.body)){
      Users.findBy({ username: username })
        .then(([user]) => {
          if(user && bcrypt.compareSync(password, user.password)){
            const token = signToken(user)
  
            res.status(200).json({ message: "welcome to your recipe app!", token, user_id: user.id })
          } else {
            res.status(401).json({ message: "Invalid credentials" })
          }
        })
        .catch(error => {
          res.status(500).json({ message: error.message })
        })
    } else {
      res.status(400).json({ message: "please provide username and password"})
    }
  });

module.exports = router;