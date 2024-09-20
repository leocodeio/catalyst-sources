// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import BlogCard from "./home_contents/BlogCard"; // Use the existing BlogCard component

// const BlogFeed = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     // Fetch blogs when the component mounts
//     const fetchBlogs = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/blogs/feed");
//         // console.log("hi")
//         setBlogs(response.data);
//         // console.log(blogs);
//       } catch (error) {
//         console.error("Error fetching blog feed:", error);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   return (
//     <div className="blog-feed">
//       <h2>Latest Blogs by Genre</h2>
//       <div className="blogs-container">
//         {blogs.length > 0 ? (
//           blogs.map((blog) => (
//             <BlogCard key={blog._id} id={blog._id} title={blog.heading} content={blog.description} />
//           ))
//         ) : (
//           <p>No blogs available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BlogFeed;



import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./home_contents/BlogCard"; // Using the existing BlogCard component

const BlogFeed = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(""); // Error handling state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/fetch-feed");
        if (response.data) {
          console.log("Fetched blogs:", response.data); // Check if blogs are fetched
          setBlogs(response.data); // Set blogs to state
        } else {
          setError("No blogs found");
        }
      } catch (error) {
        console.error("Error fetching blog feed:", error);
        setError("Error fetching blog feed"); // Set error message
      }
    };
    fetchBlogs();
  }, []); // Fetch blogs only on component mount



  useEffect(() => {
    console.log("Blogs updated:", blogs); // Log when blogs are updated
  }, [blogs]); // Watch 'blogs' for changes



  return (
    <div className="blog-feed">
      <h2>Latest Blogs</h2>
      {error && <p>{error}</p>} {/* Display error if any */}
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
