import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./home_contents/Header";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    reenterPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedin");
    if (isLoggedIn === "true") {
      navigate("/"); // Redirect to home page
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
    const { name, email, password, reenterPassword } = formData;
    if (name && email && password && password === reenterPassword) {
      try {
        const response = await axios.post("http://localhost:3001/signup", {
          name,
          email,
          password,
        });
        console.log(response.data);
        navigate("/login"); // Redirect to login page after signup
      } catch (error) {
        console.error("Error:", error);
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        reenterPassword: "",
      });
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center bg-[#e7dfd8] min-h-[calc(95vh-64px)] px-4"> {/* Adjust min height based on header height */}
        <div className="border-2 border-black p-6 md:p-12 max-w-6xl w-full relative">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                Catalyst Sources
              </h1>
              <p className="text-base md:text-lg text-black">
                This is a website that has resources of the community members shared.
              </p>
            </div>
            <div className="md:w-1/2">
              <form onSubmit={handleSubmit} id="signupForm" className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full border border-gray-400 p-3 rounded-sm bg-[#e7dfd8] focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full border border-gray-400 p-3 rounded-sm bg-[#e7dfd8] focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full border border-gray-400 p-3 rounded-sm bg-[#e7dfd8] focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="password"
                  name="reenterPassword"
                  value={formData.reenterPassword}
                  onChange={handleChange}
                  placeholder="Re-enter Password"
                  required
                  className="w-full border border-gray-400 p-3 rounded-sm bg-[#e7dfd8] focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  type="submit"
                  className="w-full p-3 bg-black text-white font-semibold rounded-sm hover:bg-gray-700"
                >
                  SIGNUP
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
