// BlogCard.js
import React from 'react';

function BlogCard({ title, content }) {
  return (
    <div className="blog-card">
      <div className="blog">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default BlogCard;
