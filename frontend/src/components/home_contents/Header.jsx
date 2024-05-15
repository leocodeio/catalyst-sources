// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, userName }) {
  return (
    <header>
      <h1>Blog Website</h1>
      <div className="list_div">
        {!isLoggedIn ? (
          <>
            <Link to="/Login" id="Login">Login</Link>
            <Link to="/signup" id="signup">Sign Up</Link>
            <Link to="/Login" className="write_blog">Create your own Blog</Link>
          </>
        ) : (
          <>
            <h1>Hello {userName}</h1>
            <Link to="/create" className="write_blog">Create your own Blog</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
