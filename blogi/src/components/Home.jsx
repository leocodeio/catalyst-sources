import React from 'react'
import Header from './home_contents/Header'
import SearchForm from './home_contents/SearchForm'
import BlogCard from './home_contents/BlogCard'
import './styles.css'

const Home = () => {
  return (
    <div>
      <Header/>
      <SearchForm/>
      <BlogCard/>
    </div>
  )
}

export default Home