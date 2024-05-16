import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedin, userName }) {
  return (
    <header>
      <h1>Blog Website</h1>
      <div className="links">
        {!isLoggedin ? (
          <>
            <Link className="link" to="/login">Login</Link>
            <Link className="link" to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <h1>Hello {userName}</h1>
            <Link className="link" to="/create">Create your own Blog</Link>
            <Link className="link" to="/logout">Logout</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
