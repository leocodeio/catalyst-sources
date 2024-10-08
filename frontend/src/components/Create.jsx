import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./home_contents/Header";

function Create() {
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    content: "",
    genre: "Action",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedin");
    if (isLoggedIn !== "true") {
      navigate("/login"); // Redirect to login page if not logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { heading, description, content, genre } = formData;
    const email = localStorage.getItem("email");
    if (heading && description && content && genre) {
      try {
        const response = await axios.post("http://localhost:3001/create", {
          heading,
          description,
          content,
          genre,
          email,
        });
        if (response.status === 200) {
          navigate("/"); // Redirect to home after successful creation
        }
      } catch (error) {
        console.error("Error:", error);
      }
      setFormData({
        heading: "",
        description: "",
        content: "",
        genre: "Action",
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center bg-[#e7dfd8] min-h-[calc(95vh-64px)]"> {/* Adjust min height according to your header height */}
        <div className="w-3/4 p-6 border border-[#000000] shadow-lg rounded-lg bg-[#e7dfd8]">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-4">
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                placeholder="Heading"
                className="w-2/3 p-2 border border-[#000000] rounded-lg placeholder-gray-500 text-[#2a2926] bg-transparent"
                required
              />
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-1/4 p-2 border border-[#000000] rounded-lg bg-transparent text-[#2a2926]"
                required
              >
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Thriller">Thriller</option>
                <option value="Drama">Drama</option>
                <option value="Social">Social</option>
                <option value="Comedy">Comedy</option>
                <option value="Horror">Horror</option>
              </select>
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-2 border border-[#000000] rounded-lg placeholder-gray-500 text-[#2a2926] bg-transparent"
                required
              />
            </div>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Content..."
              className="w-full h-48 p-2 border border-[#000000] rounded-lg bg-transparent text-[#2a2926] placeholder-gray-500 resize-y max-h-96"
              required
            />
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-[#2a2926] text-white rounded-lg hover:bg-[#403e3b]"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
  
  
}

export default Create;
