const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: String,  // The name of the user who commented
  comment: String,
  date: {
    type: Date,
    default: Date.now  // Automatically set the comment date and time
  }
});

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
  },
  genre: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [commentSchema],  // Array of comments
  ratings: [Number]  // Array of ratings (numbers from 1 to 5)
});

const UserBlog = mongoose.model('UserBlog', userBlogSchema);

module.exports = UserBlog;






// const mongoose = require('mongoose');

// const userBlogSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true
//   },
//   heading: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   content: {
//     type: String,
//     required: true
//   },
//   genre: {
//     type: String,   // Add genre field to store selected genre
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const UserBlog = mongoose.model('UserBlog', userBlogSchema);

// module.exports = UserBlog;


