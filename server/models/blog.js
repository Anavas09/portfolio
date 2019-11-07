const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  userId: {type: String, required: true},
  slug: {type: String, sparse: true, unique: true},
  title: {type: String, required: true},
  subTitle: {type: String, required: true},
  story: {type: String, required: true},
  createAt: Date.now,
  updatedAt: Date.now,
  status: {type: String, default: 'draft'},
  author: {type: String, required: true}
});

module.exports = mongoose.model('Blog', blogSchema);