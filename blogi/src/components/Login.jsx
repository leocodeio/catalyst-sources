// Login.js

import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    if (username && password) {
      // Perform form submission or API call here
      console.log("Form submitted:", formData);
      // Clear form fields after submission
      setFormData({
        username: "",
        password: "",
      });
      // Redirect user to home or perform any necessary action
      // window.location.href = 'home.php';
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="container">
      <div className="App">
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
      </div>
      <header>
        <h1>Login</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} id="loginForm">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        <Link to="/signup" id="signup">
          Sign Up
        </Link>
        <Link to="/">Home</Link>
      </main>
    </div>
  );
}

export default Login;
