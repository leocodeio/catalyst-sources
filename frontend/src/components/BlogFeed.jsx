import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./home_contents/BlogCard"; // Use the existing BlogCard component

const BlogFeed = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs when the component mounts
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/blogs/feed");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blog feed:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="blog-feed">
      <h2>Latest Blogs by Genre</h2>
      <div className="blogs-container">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog._id} id={blog._id} title={blog.heading} content={blog.description} />
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default BlogFeed;