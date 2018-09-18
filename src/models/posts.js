/*eslint max-len: ["error", { "code": 100 }]*/
'use strict';
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const postSchema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  created: { type: Number, default: Date.now },
  imagePath: { type: String, required: true},
  images: { type: Array, default: []},
  isDraft: { type: Boolean, required: true},
  places: { type: Array, default: []},
  slug: { type: String, required: true, unique: true},
  tags: { type: Array, default: []},
  title: { type: String, required: true },
  updated: { type: Number, default: Date.now }
});

postSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Post', postSchema);
