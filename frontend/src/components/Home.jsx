import React from "react";
import Header from "./home_contents/Header";
import SearchForm from "./home_contents/SearchForm";
import BlogCard from "./home_contents/BlogCard";
import './blog.css';

const Home = () => {
  return (
    <div>
      {/* <div className="links">
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/login">Login</Link>
        <Link className="link" to="/signup">Signup</Link>
        <Link className="link" to="/search">Search</Link>
      </div> */}
      <Header isLoggedin={localStorage.isLoggedin} email={localStorage.email}/>
      <SearchForm />
      <BlogCard />
    </div>
  );
};

export default Home;
