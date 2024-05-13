import React from "react";
import Header from "./home_contents/Header";
import SearchForm from "./home_contents/SearchForm";
import BlogCard from "./home_contents/BlogCard";
import "./styles.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="App">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/search">Search</Link>
      </div>
      <Header />
      <SearchForm />
      <BlogCard />
    </div>
  );
};

export default Home;
