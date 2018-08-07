/*eslint max-len: ["error", { "code": 130 }]*/
'use strict';
const PostAccessInfoSchema = require('../models/posts');

exports.create = (req, res, next) => {
  const postAccessInfo = new PostAccessInfoSchema({
    author: req.body.author,
    content: req.body.content,
    status: req.body.status,
    title: req.body.title
  });
  postAccessInfo.save().then(post => {
    res.status(200).json(post);
  }).catch(error => {
    res.status(500).json(error);
  });
};

exports.all = (req, res, next) => {
  PostAccessInfoSchema.find().then(posts => {
    res.status(200).json(posts);
  }).catch(error => {
    res.status(500).json(error);
  });
};

exports.getById = (req, res, next) => {
  PostAccessInfoSchema.findById(req.params.id).then(post => {
    res.status(200).json(post);
  }).catch(error => {
    res.status(500).json(error);
  });
};

exports.update = (req, res, next) => {
  const post = {
    author: req.body.author,
    content: req.body.content,
    status: req.body.status,
    title: req.body.title
  };
  PostAccessInfoSchema.updateOne({ _id: req.params.id }, {$set: post})
    .then(post => {
      res.status(200).json(post);
    }).catch(error => {
      res.status(500).json(error);
    });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  PostAccessInfoSchema.deleteOne({ _id: id})
    .then(id => {
      res.status(200).json(id);
    }).catch(error => {
      res.status(500).json(error);
    });
};
