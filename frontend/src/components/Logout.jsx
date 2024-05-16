import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedin"); // Remove item
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
