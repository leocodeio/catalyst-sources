const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Unauthorized access' });

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is invalid' });
    req.user = user;
    next();
  });
};

// Create a new blog (only accessible when logged in)
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { heading, description, content, genre, email } = req.body;
    const blog = new Blog({ heading, description, content, genre, email });
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error });
  }
});

// Search blogs by heading
router.get('/search', async (req, res) => {
  try {
    const { heading } = req.query;
    const blog = await Blog.findOne({ heading });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error searching blog', error });
  }
});

module.exports = router;
