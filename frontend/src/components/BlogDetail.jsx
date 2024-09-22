import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5); // Default rating
  const [user] = useState(localStorage.getItem('username')); // Logged-in user
  
  useEffect(() => {
    // Fetch blog by ID
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    fetchBlog();
  }, [id]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem('isLoggedin')) {
      alert('Please log in to leave a comment.');
      return;
    }

    try {
      const username = localStorage.getItem('username') || 'Anonymous';
      await axios.post(`http://localhost:3001/add-comment-rating/${id}`, {
        comment,
        rating,
        user: username,
      });

      setBlog((prevBlog) => ({
        ...prevBlog,
        comments: [...prevBlog.comments, { user: username, comment, date: new Date() }],
        ratings: [...prevBlog.ratings, rating],
      }));

      setComment(''); // Reset comment input
      setRating(5);   // Reset rating to default
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Calculate average rating
  const calculateAverageRating = (ratings) => {
    if (!ratings.length) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(1);
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h1>{blog.heading}</h1>
      <p><strong>Description:</strong><br></br> {blog.description}</p>
      <p><strong>Content:</strong><br></br> {blog.content}</p>
      <p><strong>Genre:</strong><br></br> {blog.genre}</p>
      <p><strong>Average Rating:</strong><br></br> {calculateAverageRating(blog.ratings)} / 5</p>
      <p><strong>Created At:</strong><br></br> {new Date(blog.createdAt).toLocaleString()}</p>

      {/* Display comments */}
      <div>
        <h2>Comments</h2>
        
        {blog.comments.length > 0 ? (
          blog.comments.map((c, index) => (
            <div key={index}>
              <strong>{c.user}</strong>: <br></br>{c.comment} ({new Date(c.date).toLocaleString()})
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      {/* Add comment form */}
      <div>
      
        <h3>Leave a Comment and Rating</h3>
        <br></br>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment"
            required
          />
          <br />
          <label>Rate the blog:</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} required>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <br />
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    </div>
  );
};

export default BlogDetail;