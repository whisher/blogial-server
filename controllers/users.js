const mongoose = require('mongoose');

const User = require('../models/user');

exports.find = function(req, res, next) {
  User.find()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    throw new Error(err);
  });
};

exports.save = (req, res, next) => {
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.firstname,
    roles: req.body.roles,
  });
  user.save()
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    throw new Error(err);
  });
};

exports.findById = (req, res, next) => {console.log(req.params.id);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error('Please provide correct Id');
  }
  User.findById(req.params.id)
  .then(user => {
    if(!user) {
      return res.status(404).send({message: `User not found with id ${req.params.id}`});
    }
    res.status(200).json(user);
  })
  .catch(err => {
    throw new Error(err);
  });
};

exports.update = function(req, res, next) {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error('Please provide correct Id');
  }
  User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
  .then(user => {
    if(!user) {
      return res.status(404).send({message: `User not found with id ${req.params.id}`});
    }
    res.status(200).json(user);
  });
};

exports.delete = function(req, res, next) {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error('Please provide correct Id');
  }
  User.findByIdAndRemove(req.params.id)
  .then(user => {
    if(!user) {
      return res.status(404).send({message: `User not found with id ${req.params.id}`});
    }
    res.status(200).json(user);
  });
};
