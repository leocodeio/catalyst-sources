import React, { useState } from 'react';
import axios from 'axios';

function SearchForm() {
  const [query, setQuery] = useState('');
  const [blog, setBlog] = useState(null); // To store the found blog
  const [name, setName] = useState('');   // To store the user's name
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5); // Default rating is 5
  const [error, setError] = useState(null); // To handle any error

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);  // Clear previous errors
    setBlog(null);   // Clear previous results
    try {
      const response = await axios.get(`http://localhost:3001/search?heading=${query}`);
      if (response.data) {
        setBlog(response.data);  // Set the found blog
      }
    } catch (error) {
      setError('Blog not found');  // Handle error
      console.error('Search failed:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (blog) {
      try {
        await axios.post(`http://localhost:3001/add-comment-rating/${blog._id}`, {
          comment,
          rating,
          user: name || 'Anonymous',  // Send the name or default to 'Anonymous'
        });
        setBlog((prevBlog) => ({
          ...prevBlog,
          comments: [...prevBlog.comments, { user: name || 'Anonymous', comment, date: new Date() }],
          ratings: [...prevBlog.ratings, rating],
        }));
        setComment(''); // Clear comment input
        setRating(5);   // Reset rating to default
        setName('');    // Clear name input
      } catch (error) {
        console.error('Failed to add comment/rating:', error);
      }
    }
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings.length) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(1);
  };

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search blogs by heading"
        />
        <button type="submit">Search</button>
      </form>

      {/* Error message if blog not found */}
      {error && <p>{error}</p>}

      {/* Display blog if found */}
      {blog && (
        <>
          {/* Blog details inside the box */}
          <div style={{ marginTop: '20px', border: '1px solid black', padding: '10px' }}>
            <h2>{blog.heading}</h2>
            <p><strong>Description:</strong> {blog.description}</p>
            <p><strong>Content:</strong> {blog.content}</p>
            <p><strong>Genre:</strong> {blog.genre}</p>
            <p><strong>Average Rating:</strong> {calculateAverageRating(blog.ratings)} / 5</p>
            <p><strong>Created At:</strong> {new Date(blog.createdAt).toLocaleString()}</p>
          </div>

          {/* Comments and leave a comment section inside a separate box */}
          <div style={{ marginTop: '20px', border: '1px solid black', padding: '10px' }}>
            {/* Comments section */}
            <div>
              <h3>Comments</h3>
              {blog.comments.length > 0 ? (
                blog.comments.map((c, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <strong>{c.user}</strong>: {c.comment} ({new Date(c.date).toLocaleString()})
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>

            {/* Leave a comment and rate the blog section */}
            <div style={{ marginTop: '20px' }}>
              <h3>Leave a Comment and Rating</h3>
              <form onSubmit={handleCommentSubmit}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
                <br />
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your comment"
                  required
                />
                <br />
                <label>Rate the blog (Default is 5):</label>
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
        </>
      )}
    </div>
  );
}

export default SearchForm;