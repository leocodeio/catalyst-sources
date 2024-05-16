import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isLoggedin, email }) {

  console.log(isLoggedin,email);
  return (
    <header>
      <h1>Blog Website</h1>
      <div className="links">
        {!(isLoggedin === "true") ? (
          <>
            <Link className="link" to="/login">Login</Link>
            <Link className="link" to="/signup">Sign Up</Link>
            <Link className="link" to="/login">Create your own Blog</Link>
          </>
        ) : (
          <>
            <h1>Hello {email}</h1>
            <Link className="link" to="/create">Create your own Blog</Link>
            <Link className="link" to="/logout">Logout</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
