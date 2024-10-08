import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaComments, FaStar } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns"; // Import for time formatting
import Header from "./home_contents/Header";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("isLoggedin")) {
      alert("Please log in to leave a comment.");
      return;
    }

    try {
      const username = localStorage.getItem("username") || "Anonymous";
      await axios.post(`http://localhost:3001/add-comment-rating/${id}`, {
        comment,
        rating,
        user: username,
      });

      setBlog((prevBlog) => ({
        ...prevBlog,
        comments: [
          ...prevBlog.comments,
          { user: username, comment, date: new Date() },
        ],
      }));

      setComment("");
      setRating(5);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings.length) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <>
      <Header></Header>
      <div className="min-h-screen bg-[#e7dfd8] flex flex-col items-center px-4">
        <div className="max-w-4xl w-full mt-8 sm:mr-4">
          {" "}
          {/* Adjust margin for mobile view */}
          {/* Header Image */}
          <img
            src={blog.imageUrl || "https://via.placeholder.com/800"}
            alt="Blog Header"
            className="w-full h-64 object-cover rounded-lg"
          />
          {/* Blog Title */}
          <h1 className="text-4xl font-bold mt-6 text-gray-800">
            {blog.heading}
          </h1>
          <p className="text-sm text-gray-600 mt-2">{`Written by ${
            blog.email
          } on ${new Date(blog.createdAt).toLocaleDateString()}`}</p>
          {/* Blog Description and Content */}
          <p className="text-lg mt-4 text-gray-700">{blog.description}</p>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <FaStar className="text-yellow-500 mr-2" />
              <p className="text-md font-semibold">
                {calculateAverageRating(blog.ratings)} / 5
              </p>
            </div>
            <button
              onClick={toggleComments}
              className="mt-4 bg-black text-white py-2 px-4 rounded-lg flex items-center"
            >
              <FaComments className="mr-2" />
              {showComments ? "Hide Comments" : "Show Comments"}
            </button>
          </div>
          <p className="text-base mt-2 text-gray-600">{blog.content}</p>
          {/* Comments Sidebar */}
          <div
            className={`fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg p-4 transition-opacity duration-500 ease-in-out ${
              showComments ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Comments</h2>
              <button
                onClick={toggleComments}
                className="text-red-500 hover:text-red-700 text-2xl p-2"
                aria-label="Close Comments"
              >
                &times;
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100%-64px)]">
              {blog.comments.length > 0 ? (
                blog.comments.map((c, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 border rounded-lg shadow-md p-4 my-4"
                  >
                    <div className="flex items-start mb-2">
                      <img
                        src={c.profilePic}
                        alt={`${c.user}'s profile`}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <div>
                        <strong className="text-sm">{c.user}</strong>
                        <span className="text-sm text-gray-500 ml-2">
                          {formatDistanceToNow(new Date(c.date), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700">{c.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </div>
          </div>
          {/* Add Comment Form */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">
              Leave a Comment and Rating
            </h3>
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment"
                className="w-full border rounded-lg p-2"
                required
              />
              <label className="mt-2 block">Rate the blog:</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border rounded-lg p-2 mt-1"
                required
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-lg mt-4"
              >
                Submit Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
