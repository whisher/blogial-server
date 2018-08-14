/*eslint max-len: ['error', { 'code': 130 }]*/
'use strict';
const Post = require('../models/posts');

const getProtocol = (req) => {
  return req.secure ? 'https' : 'http';
};

exports.create = (req, res, next) => {
  const url = getProtocol(req) + '://' + req.get('host');
  const post = new Post({
    author: req.userData,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename,
    files: JSON.parse(req.body.files),
    places: JSON.parse(req.body.places),
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

exports.update = (req, res, next) => {
  let imagePath = req.body.image;
  if (req.file) {
    const url = getProtocol(req) + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }
  const postData = {
    author: req.userData,
    content: req.body.content,
    imagePath: imagePath,
    files: JSON.parse(req.body.files),
    places: JSON.parse(req.body.places),
    isDraft: req.body.isDraft,
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

exports.all = (req, res, next) => {
  Post.find().populate('author', '_id email role display_name')
    .sort({ created: 1 })
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

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Post.findOneAndRemove({ _id: id})
    .then(post => {
      res.status(200).json(post._id);
    }).catch(error => {
      res.status(500).json(error);
    });
};

exports.gallery = (req, res, next) => {
  const url = getProtocol(req) + '://' + req.get('host');
  const src = url + '/' + req.file.path;
  const name = req.file.originalname;
  const data = {src: src, name: name};
  res.status(200).json(data);
};
