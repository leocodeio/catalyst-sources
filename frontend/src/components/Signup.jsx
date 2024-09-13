import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import axios from 'axios';
import './blog.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    reenterPassword: "",
  });

  const navigate = useNavigate();  // Initialize navigate hook

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
        const response = await axios.post('http://localhost:3001/signup', { name, email, password });
        console.log(response.data);
        navigate('/login');  // Redirect to login after successful signup
      } catch (error) {
        console.error('Error:', error);
      }
      console.log("Form submitted:", formData);
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
    <div className="container">
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
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
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
      </main>
    </div>
  );
}

export default SignUp;