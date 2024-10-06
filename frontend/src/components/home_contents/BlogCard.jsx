import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({
  _id,
  email = "Unknown Author",
  heading = "No Title",
  description = "No Description",
  genre = "Uncategorized",
  ratings = [],
  comments = [],
  createdAt = new Date().toISOString(),
  imageUrl = "https://via.placeholder.com/150",
}) => {
  const navigate = useNavigate();

  // Calculate the average rating
  const averageRating = ratings.length
    ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    : "(n/a)";

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4 w-full flex flex-col cursor-pointer hover:shadow-xl transition duration-300"
      onClick={() => navigate(`/blog/${_id}`)} // Navigate on click
    >
      <div className="flex flex-col md:flex-row">
        {/* Left section with author info and content */}
        <div className="flex-1 mb-4 md:mb-0">
          <div className="flex items-center mb-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Author"
              className="rounded-full w-10 h-10 mr-3"
            />
            <div>
              <p className="font-semibold text-gray-800">{email}</p>
              <p className="text-sm text-gray-500">{genre}</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">{heading}</h2>
          <p className="text-gray-600 mb-4">{description}</p>

          <div className="flex items-center text-gray-500 space-x-4">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 4.354V19.53m7.646-7.646L12 4.354m0 0L4.354 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {new Date(createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 15l7-7 7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {averageRating} / 5
            </span>
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 01-9 8.5A8.38 8.38 0 013 11.5C3 8.462 5.462 6 8.5 6h7C18.538 6 21 8.462 21 11.5z" />
              </svg>
              {comments.length} comments
            </span>
          </div>
          
        </div>
        <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0">
            <img
              src={imageUrl}
              alt="Blog"
              className="w-32 h-32 object-cover rounded-md"
            />
          </div>
      </div>
    </div>
  );
};

export default BlogCard;
