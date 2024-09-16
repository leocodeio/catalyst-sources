import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
//import './blog.css';

function Create() {
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    content: "",
    genre: "Action",  // Default genre value
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { heading, description, content, genre } = formData;
    const email = localStorage.email;
    if (heading && description && content && genre) {
      try {
        const response = await axios.post('http://localhost:3001/create', { heading, description, content, genre, email });
        console.log(response.data);
        if (response.status === 200){
          navigate('/');
        }
      } catch (error) {
        console.error('Error:', error);
      }
      console.log("Form submitted:", formData);
      setFormData({
        heading: "",
        description: "",
        content: "",
        genre: "Action",  // Reset genre to default after submission
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div>
      <div className="links">
        <Link className="link" to="/">Home</Link>
      </div>
      <header>
        <h1>Create a Blog</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            placeholder="Heading"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Content"
            required
          />
          <br></br>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Thriller">Thriller</option>
            <option value="Drama">Drama</option>
            <option value="Social">Social</option>
            <option value="Comedy">Comedy</option>
            <option value="Horror">Horror</option>
          </select>
          <br />
          <button type="submit">Create</button>
        </form>
      </main>
    </div>
  );
}

export default Create;