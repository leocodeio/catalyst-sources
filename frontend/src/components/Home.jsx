import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./home_contents/Header";
import BlogCard from "./home_contents/BlogCard";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [genres, setGenres] = useState([]);
  const [fadeOut, setFadeOut] = useState(false); // Control for fading effect

  // Function to fetch all blogs initially
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/blogs`);
      setBlogs(response.data);
      // Extract unique genres
      const uniqueGenres = [
        ...new Set(response.data.map((blog) => blog.genre)),
      ];
      setGenres(["All", ...uniqueGenres]); // Include 'All' as an option
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle genre change with fade-out animation
  const handleGenreChange = (genre) => {
    setFadeOut(true); // Trigger fade-out animation
    setTimeout(() => {
      setSelectedGenre(genre); // Change the genre after fade-out completes
      setFadeOut(false); // Trigger fade-in animation
    }, 300); // The timeout should match the animation duration
  };

  // Filter blogs based on the search term and selected genre
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.heading
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === "All" || blog.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-[#e7dfd8]">
      {" "}
      {/* Coffee-colored background */}
      {/* Header */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* Genre Filter Section */}
      <div className="max-w-7xl mx-auto py-6 px-4 bg-white shadow-md rounded-lg mt-4">
        <h2 className="text-3xl font-semibold text-[#2a2926] mb-4">
          Filter by Genre:
        </h2>
        <div className="flex overflow-x-auto scrollbar-hide py-4 px-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreChange(genre)}
              className={`px-4 py-2 rounded-full border border-[#2a2926] text-[#2a2926] whitespace-nowrap 
        ${
          selectedGenre === genre
            ? "bg-[#2a2926] text-white"
            : "bg-white hover:bg-gray-100"
        }
        transition-colors duration-300 ease-in-out mx-2`} // Added mx-2 for horizontal margin
            >
              {genre}
            </button>
          ))}
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Use the filter to find blogs by genre.
        </p>
      </div>
      {/* Genre Connection Card - Connects the genre to the blog cards visually */}
      <div className="relative max-w-7xl mx-auto py-6 px-4 flex items-center justify-center">
        {/* Connector Line */}
        <div className="absolute w-full bg-[#2a2926] top-1/2 h-px z-0"></div>

        {/* Connector Card */}
        <div className="relative z-10 bg-[#2a2926] text-white px-10 py-4 rounded-full shadow-lg">
          <h3 className="text-2xl font-semibold text-center">
            {selectedGenre === "All"
              ? "Showing All Genres"
              : `Selected Genre: ${selectedGenre}`}
          </h3>
        </div>
      </div>
      {/* Blog List Section */}
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300 ease-in-out 
          ${fadeOut ? "opacity-0" : "opacity-100"}`} // Handle fade effect
        >
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                _id={blog._id} // Ensure you're passing the _id here
                email={blog.email}
                heading={blog.heading}
                description={blog.description}
                genre={blog.genre}
                ratings={blog.ratings}
                comments={blog.comments}
                createdAt={blog.createdAt}
                imageUrl="https://via.placeholder.com/150" // Placeholder or actual image URL
              />
            ))
          ) : (
            <p className="text-[#2a2926] text-xl">
              No blogs match your search criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
