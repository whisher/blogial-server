/*eslint max-len: ["error", { "code": 130 }]*/
'use strict';
const Post = require('../models/posts');

exports.create = (req, res, next) => {
  const post = new Post({
    author: req.userData,
    content: req.body.content,
    isDraft: req.body.isDraft,
    status: req.body.status,
    title: req.body.title
  });
  post.populate('author', '_id email role display_name').execPopulate();
  post.save()
    .then(post => {
      res.status(200).json(post);
    }).catch(error => {
      res.status(500).json(error);
    });
};

exports.all = (req, res, next) => {
  Post.find().populate('author', '_id email role display_name')
    .then(posts => {
      res.status(200).json(posts);
    }).catch(error => {
      res.status(500).json(error);
    });
};

exports.getById = (req, res, next) => {
  Post.findById(req.params.id)
    .populate('author', '_id email role display_name')
    .then(post => {
      res.status(200).json(post);
    }).catch(error => {
      res.status(500).json(error);
    });
};

exports.update = (req, res, next) => {
  const postData = {
    author: req.userData,
    content: req.body.content,
    status: req.body.status,
    title: req.body.title,
    updated: Date.now()
  };
  Post.findByIdAndUpdate({ _id: req.params.id }, postData, {new: true})
    .populate('author', '_id email role display_name')
    .then(post => {
      res.status(200).json(post);
    }).catch(error => {
      res.status(500).json(error);
    });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Post.findOneAndRemove({ _id: id})
    .then(post => {
      res.status(200).json(post._id);
    }).catch(error => {
      res.status(500).json(error);
    });
};
