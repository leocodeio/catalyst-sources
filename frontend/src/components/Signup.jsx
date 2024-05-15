// SignUp.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    reenterPassword: "",
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
    const { username, email, password, reenterPassword } = formData;
    if (username && email && password && password === reenterPassword) {
      // Perform form submission or API call here
      console.log("Form submitted:", formData);
      // Clear form fields after submission
      setFormData({
        username: "",
        email: "",
        password: "",
        reenterPassword: "",
      });
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  return (
    <div>
      <div className="links">
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/login">Login</Link>
      </div>
      <header>
        <h1>Sign Up</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} id="signupForm">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
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
          <input
            type="password"
            name="reenterPassword"
            value={formData.reenterPassword}
            onChange={handleChange}
            placeholder="Re-enter Password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <Link className="link" to="/Login">Login</Link>
        <Link className="link" to="/">Home</Link>
      </main>
    </div>
  );
}

export default SignUp;
