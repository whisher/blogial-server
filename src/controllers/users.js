const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config/config');
const UserAccessInfo = require('../models/users');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const userAccessInfo = new UserAccessInfo({
      email: req.body.email,
      password: hash,
      username: req.body.username,
    });
    userAccessInfo.save()
    .then(user => {
      const token = jwt.sign(
        { userId: user._id, email: user.email, username: user.username  },
        config.secret,
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
  });
}

exports.login = (req, res, next) => {
  let fetchedUser;
  UserAccessInfo.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      fetchedUser = user;
      bcrypt.compare(req.body.password, user.password)
      .then(result => {
        if (!result) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        const token = jwt.sign(
          { userId: user._id, email: user.email, username: user.username  },
          config.secret,
          { expiresIn: '1h' }
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600
        });
      })
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Auth failed'
    });
  });
}

exports.account = (req, res, next) => {
  res.status(200).json(req.userData);
}
