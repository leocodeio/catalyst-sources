// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Header from "./home_contents/Header";
// import BlogCard from "./home_contents/BlogCard";
// import BlogFeed from "./BlogFeed";

// const Home = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [selectedGenre, setSelectedGenre] = useState("");
//   const [blogFeed, setBlogFeed] = useState([]);

//   const genres = ["Action", "Adventure", "Thriller", "Drama", "Social", "Comedy", "Horror"];

//   // Function to fetch blogs based on selected genre
//   const fetchBlogsByGenre = async (genre) => {
//     try {
//       const response = await axios.get(`http://localhost:3001/blogs/genre?genre=${genre}`);
//       setBlogs(response.data);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedGenre) {
//       fetchBlogsByGenre(selectedGenre);
//     }
//   }, [selectedGenre]);

//   //Change
  
//   useEffect(async()=>{
//     try {
//       const response = await axios.get(`http://localhost:3001/blogs/feed`);

//       setBlogFeed(response.data);
//       console.log(blogFeed)
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//   },[])
// //till here

//   return (
//     <div>
//       <Header isLoggedin={localStorage.isLoggedin} email={localStorage.email} />

//       {/* Genre Filter Section */}
//       <div className="genre-filter">
//         <h2>Select a Genre:</h2>
//         {genres.map((genre) => (
//           <button key={genre} onClick={() => setSelectedGenre(genre)}>
//             {genre}
//           </button>
//         ))}
//       </div>

//       {/* Blog List Section */}
//       <div className="blog-list">
//         {blogs.length > 0 ? (
//           blogs.map((blog) => (
//             <BlogCard key={blog._id} id={blog._id} title={blog.heading} content={blog.description} />
//           ))
//         ) : (
//           <p>No blogs available in this genre.</p>
//         )}
//       </div>
// //change
//       <div className="blog-list">
//         {blogFeed.length > 0 ? (
//           blogFeed.map((blog) => (
//             <BlogCard key={blog._id} id={blog._id} title={blog.heading} content={blog.description} />
//           ))
//         ) : (
//           <p>No blogs available in this genre.</p>
//         )}
//       </div>
//       //
//     </div>
//   );
// };

// export default Home;






import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./home_contents/Header";
import BlogCard from "./home_contents/BlogCard";
import BlogFeed from "./BlogFeed";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const genres = ["Action", "Adventure", "Thriller", "Drama", "Social", "Comedy", "Horror"];

  // Function to fetch blogs based on selected genre
  const fetchBlogsByGenre = async (genre) => {
    try {
      const response = await axios.get(`http://localhost:3001/blogs/genre?genre=${genre}`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    if (selectedGenre) {
      fetchBlogsByGenre(selectedGenre);
    }
  }, [selectedGenre]);

  // Updated useEffect for fetching blog feed
// empty dependency array to run on mount only

  return (
    <div>
      <Header isLoggedin={localStorage.isLoggedin} email={localStorage.email} />

      {/* Genre Filter Section */}
      <div className="genre-filter">
        <h2>Select a Genre:</h2>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>

      {/* Blog List Section */}
      <div className="blog-list">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog._id} id={blog._id} title={blog.heading} content={blog.description} />
          ))
        ) : (
          <p>No blogs available in this genre.</p>
        )}
      </div>

      {/* Blog Feed Section */}
      <BlogFeed/>
    </div>
  );
};

export default Home;
