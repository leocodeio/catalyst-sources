import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './blog.css';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
        const response = await axios.post('http://localhost:3001/login', { email, password });
        if (response.status === 200) {
          localStorage.setItem("isLoggedin", "true"); // Set as string
          localStorage.setItem("email", email); // Save the email
          localStorage.setItem("username", response.data.user); // Save the user's name
          navigate('/'); // Redirect to home page
        } else {
          console.log('Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="container">
      <div className="links">
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/signup">Signup</Link>
      </div>
      <header>
        <h1>Login</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} id="loginForm">
          <input
            type="text"
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
          <button type="submit">Login</button>
        </form>
      </main>
    </div>
  );
}

export default Login;
