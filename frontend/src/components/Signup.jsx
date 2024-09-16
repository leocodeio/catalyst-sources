import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from './LoginSignup.module.css'; // Import CSS module

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
    <div className={styles.container}>
      <div className={styles.links}>
        <Link className={styles.link} to="/">Home</Link>
        <Link className={styles.link} to="/login">Login</Link>
      </div>
      <header>
        <h1 className={styles.header}>Sign Up</h1>
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
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className={styles.input}
          />
          <input
            type="password"
            name="reenterPassword"
            value={formData.reenterPassword}
            onChange={handleChange}
            placeholder="Re-enter Password"
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Sign Up</button>
        </form>
      </main>
    </div>
  );
}

export default SignUp;