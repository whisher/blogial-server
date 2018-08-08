/*eslint max-len: ["error", { "code": 130 }]*/
'use strict';
const Post = require('../models/posts');

exports.create = (req, res, next) => {
  const postInfo = new Post({
    author: req.userData,
    content: req.body.content,
    status: req.body.status,
    title: req.body.title
  });
  postInfo.save().then(post => {
    res.status(200).json(post);
  }).catch(error => {
    res.status(500).json(error);
  });
};

exports.all = (req, res, next) => {
  Post.find().populate('author', '_id email role')
    .then(posts => {
      res.status(200).json(posts);
    }).catch(error => {
      res.status(500).json(error);
    });
};

exports.getById = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    res.status(200).json(post);
  }).catch(error => {
    res.status(500).json(error);
  });
};

exports.update = (req, res, next) => {
  const post = {
    author: req.userData.userId,
    content: req.body.content,
    status: req.body.status,
    title: req.body.title,
    updated: Date.now()
  };
  Post.updateOne({ _id: req.params.id }, {$set: post})
    .then(post => {
      res.status(200).json(post);
    }).catch(error => {
      res.status(500).json(error);
    });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Post.deleteOne({ _id: id})
    .then(id => {
      res.status(200).json(id);
    }).catch(error => {
      res.status(500).json(error);
    });
};
