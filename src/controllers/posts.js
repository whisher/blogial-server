/*eslint max-len: ['error', { 'code': 130 }]*/
'use strict';
const fs = require('fs');
const path = require('path');
const pump = require('pump');
const sharp = require('sharp');
const slugify = require('node-slugify');

const Post = require('../models/posts');

const getUrl = (req) => {
  return (req.secure ? 'https' : 'http') + '://' + req.get('host');
};

const createThumb = (imageName) => {
  const prefix = 'thumb_';
  const imagePath = './images/';
  const readableStream = fs.createReadStream(imagePath + imageName);
  const writableStream = fs.createWriteStream(imagePath + prefix + imageName);
  const transformer = sharp()
    .resize(250, 250)
    // .crop(sharp.strategy.entropy)
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

exports.create = (req, res, next) => {
  const url = getUrl(req);
  const imageName = createThumb(req.file.filename);
  const imagePath = url + '/images/' + imageName;
  const post = new Post({
    author: req.userData,
    content: req.body.content,
    imagePath: imagePath,
    images: req.body.images,
    places: req.body.places,
    isDraft: req.body.isDraft,
    slug: slugify(req.body.title),
    status: req.body.status,
    tags: req.body.tags,
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
    const url = getUrl(req);
    const imageName = createThumb(req.file.filename);
    imagePath = url + '/images/' + imageName;
  }
  const postData = {
    author: req.userData,
    content: req.body.content,
    imagePath: imagePath,
    images: req.body.images,
    places: req.body.places,
    isDraft: req.body.isDraft,
    status: req.body.status,
    slug: slugify(req.body.title),
    tags: req.body.tags,
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
      const published = posts.filter((post) => {
        if (!req.headers.authorization && post.isDraft) {
          return false;
        }
        return true;
      });
      res.status(200).json(published);
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
  const imagePath = './images/';
  const sizes = [200, 800];
  const image = `${imagePath}${req.file.filename}`;
  const ext = path.extname(image);
  const filename = path.basename(image, ext);
  const resize = size => sharp(`${image}`)
    .resize(size, size)
    .toFile(`${imagePath}${filename}-${size}${ext}`);
  Promise
    .all(sizes.map(resize))
    .then(metadata => {
      const url = getUrl(req);
      const images = sizes.map(size => {
        const name = `${filename}-${size}`;
        const src = url + '/images/' + `${name}${ext}`;
        const data = {src: src, name: name};
        return data;
      });
      res.status(200).json(images);
    });
};
