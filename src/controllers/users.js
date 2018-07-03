/*eslint max-len: ["error", { "code": 130 }]*/
'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config/config');
const UserAccessInfo = require('../models/users');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const userAccessInfo = new UserAccessInfo({
      city: req.body.city,
      company_name: req.body.company_name,
      company_city: req.body.company_city,
      company_website: req.body.company_website,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hash,
      role: req.body.role,
      username: req.body.username
    });
    userAccessInfo.save().then(user => {
      const token = jwt.sign(
        { userId: user._id, email: user.email, username: user.username, avatar: user.avatar, hasWelcome: user.hasWelcome },
        config.secret,
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    }).catch(error => {
      res.status(500).json(error);
    });
  });
};

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
      bcrypt.compare(req.body.password, user.password).then(result => {
        if (!result) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        const token = jwt.sign(
          { userId: user._id, email: user.email, username: user.username, avatar: user.avatar, hasWelcome: user.hasWelcome },
          config.secret,
          { expiresIn: '1h' }
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600
        });
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Auth failed'
    });
  });
};

exports.account = (req, res, next) => {
  res.status(200).json(req.userData);
};
