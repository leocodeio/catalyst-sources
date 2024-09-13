import React from 'react';
import { useNavigate } from 'react-router-dom';
import './blog.css';

const Logout = () => {
  const navigate=useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedin"); // Remove item
    localStorage.removeItem("email"); // Remove item
    navigate("/");
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
