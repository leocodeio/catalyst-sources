import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./home_contents/Header";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
    const { email, password } = formData;
    if (email && password) {
      try {
        const response = await axios.post("http://localhost:3001/login", {
          email,
          password,
        });
        if (response.status === 200) {
          localStorage.setItem("isLoggedin", "true"); // Set as string
          localStorage.setItem("email", email); // Save the email
          localStorage.setItem("username", response.data.user); // Save the user's name
          navigate("/"); // Redirect to home page
        } else {
          console.log("Login failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center bg-[#e7dfd8] min-h-[calc(95vh-64px)] px-4">
        <div className="border-2 border-black p-6 md:p-12 max-w-6xl w-full relative">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                Catalyst Sources
              </h1>
              <p className="text-base md:text-lg text-black">
                Log into Catalyst Sources to access resources shared by the
                community members.
              </p>
            </div>
            <div className="md:w-1/2">
              <form
                onSubmit={handleSubmit}
                id="loginForm"
                className="space-y-4"
              >
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
                <button
                  type="submit"
                  className="w-full p-3 bg-black text-white font-semibold rounded-sm hover:bg-gray-700"
                >
                  LOGIN
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
