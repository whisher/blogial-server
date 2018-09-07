/*eslint max-len: ["error", { "code": 130 }]*/
'use strict';
const fs = require('fs');
const pump = require('pump');
const sharp = require('sharp');
// Jwt
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config/config');
const User = require('../models/users');

const getUrl = (req) => {
  return (req.secure ? 'https' : 'http') + '://' + req.get('host');
};

const createAvatar = (imageName) => {
  const prefix = 'avatar_';
  const imagePath = './images/';
  const readableStream = fs.createReadStream(imagePath + imageName);
  const writableStream = fs.createWriteStream(imagePath + prefix + imageName);
  const transformer = sharp()
    .resize(150, 150)
    .crop(sharp.strategy.entropy)
    .on('error', function(err) {
      console.log('sharp ', err);
    });
  pump(readableStream, transformer, writableStream, function(err) {
    if (err) {
      console.log('pipe sharp finished', err);
    }
  });
  return prefix + imageName;
};

const updateUser = (id, data) => {
  return User.findByIdAndUpdate({ _id: id }, data, {new: true});
};

exports.create = (req, res, next) => {
  let avatar = null;
  if (req.file) {
    const url = getUrl(req);
    const imageName = createAvatar(req.file.filename);
    avatar = url + '/images/' + imageName;
  }
  bcrypt.hash(req.body.password, 10).then(hash => {
    const userData = new User({
      avatar: avatar,
      display_name: req.body.display_name,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hash,
      role: req.body.role
    });
    userData.save().then(user => {
      delete user.password;
      res.status(200).json(user);
    }).catch(error => {
      res.status(500).json(error);
    });
  });
};

exports.update = (req, res, next) => {
  let avatar = req.body.avatar;
  if (req.file) {
    const url = getUrl(req);
    const imageName = createAvatar(req.file.filename);
    avatar = url + '/images/' + imageName;
  }
  const userData = {
    avatar: avatar,
    display_name: req.body.display_name,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    role: req.body.role
  };
  if (req.body.password !== 'xxxxx') {
    bcrypt.hash(req.body.password, 10).then(hash => {
      userData.password = hash;
      updateUser(req.params.id, userData)
        .then(user => {
          delete user.password;
          res.status(200).json(user);
        }).catch(error => {
          res.status(500).json(error);
        });
    });
  } else {
    updateUser(req.params.id, userData)
      .then(user => {
        delete user.password;
        res.status(200).json(user);
      }).catch(error => {
        res.status(500).json(error);
      });
  }
};

exports.all = (req, res, next) => {
  User.find()
    .select('-password')
    .sort({ created: 1 })
    .then(users => {
      res.status(200).json(users);
    }).catch(error => {
      res.status(500).json(error);
    });
};

exports.getById = (req, res, next) => {
  User.findById(req.params.id)
    .select('-password')
    .then(user => {
      res.status(200).json(user);
    }).catch(error => {
      res.status(500).json(error);
    });
};


exports.delete = (req, res, next) => {
  const id = req.params.id;
  User.findOneAndRemove({ _id: id})
    .then(user => {
      res.status(200).json(user._id);
    }).catch(error => {
      res.status(500).json(error);
    });
};

exports.login = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
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
          {
            avatar: user.avatar,
            display_name: user.display_name,
            email: user.email,
            _id: user._id,
            role: user.role
          },
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
