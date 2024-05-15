// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, userName }) {
  return (
    <header>
      <h1>Blog Website</h1>
      <div className="links">
        {!isLoggedIn ? (
          <>
            <Link className="link" to="/Login" id="Login">Login</Link>
            <Link className="link" to="/signup" id="signup">Sign Up</Link>
            <Link className="link" to="/Login">Create your own Blog</Link>
          </>
        ) : (
          <>
            <h1>Hello {userName}</h1>
            <Link className="link" to="/create">Create your own Blog</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
