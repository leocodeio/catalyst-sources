const mongoose = require('mongoose');

const userBlogSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const UserBlog = mongoose.model('UserBlog', userBlogSchema);

module.exports = UserBlog;
