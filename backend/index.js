// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const User = require("./models/User");
// const UserBlog = require("./models/UserBlog");

// const app = express();
// const port = 3001;

// mongoose.connect("mongodb://localhost:27017/blog", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// app.use(bodyParser.json());
// app.use(cors());

// app.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const user = new User({
//       name,
//       email,
//       password,
//     });
//     await user.save();
//     res.status(201).send("User saved successfully");
//   } catch (error) {
//     res.status(500).send("Error saving user to database");
//   }
// });

// // Login Route
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email, password });
//     if (user) {
//       res.status(200).json({ message: "Login successful", user: user.name });
//     } else {
//       res.status(401).send("Invalid email or password");
//     }
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.post("/create", async (req, res) => {
//   const { heading, description, content, genre, email } = req.body;
//   try {
//     const userBlog = new UserBlog({
//       email,
//       heading,
//       description,
//       content,
//       genre,
//       createdAt: Date.now(),
//     });
//     await userBlog.save();
//     res.status(201).json(userBlog);
//   } catch (error) {
//     res.status(500).send("Error saving blog to database");
//   }
// });

// // Search blog by heading
// app.get("/search", async (req, res) => {
//   const { heading } = req.query;
//   try {
//     const blog = await UserBlog.findOne({ heading: new RegExp(heading, "i") }); // Case-insensitive search
//     if (blog) {
//       res.status(200).json(blog);
//     } else {
//       res.status(404).send("Blog not found");
//     }
//   } catch (error) {
//     res.status(500).send("Error searching blog in the database");
//   }
// });

// // Add comment and rating to a blog (only for logged-in users)
// app.post("/add-comment-rating/:blogId", async (req, res) => {
//   const { blogId } = req.params;
//   const { comment, rating = 5, user } = req.body; // Get user from the request body

//   try {
//     if (!user) {
//       return res.status(403).send("You need to be logged in to comment.");
//     }

//     const blog = await UserBlog.findById(blogId);
//     if (!blog) {
//       return res.status(404).send("Blog not found");
//     }

//     // Add the comment and rating
//     blog.comments.push({ user, comment });
//     if (rating >= 1 && rating <= 5) {
//       blog.ratings.push(rating);
//     }

//     await blog.save();
//     res.status(200).json(blog);
//   } catch (error) {
//     res.status(500).send("Error adding comment or rating");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });




const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const UserBlog = require("./models/UserBlog");

const app = express();
const port = 3001;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes

// Sign Up Route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send("User saved successfully");
  } catch (error) {
    res.status(500).send("Error saving user to database");
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: "Login successful", user: user.name });
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Create a Blog
app.post("/create", async (req, res) => {
  const { heading, description, content, genre, email } = req.body;
  try {
    const userBlog = new UserBlog({
      email,
      heading,
      description,
      content,
      genre,
      createdAt: Date.now(),
    });
    await userBlog.save();
    res.status(201).json(userBlog);
  } catch (error) {
    res.status(500).send("Error saving blog to database");
  }
});

// Search Blog by Heading
app.get("/search", async (req, res) => {
  const { heading } = req.query;
  try {
    const blog = await UserBlog.findOne({ heading: new RegExp(heading, "i") });
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).send("Blog not found");
    }
  } catch (error) {
    res.status(500).send("Error searching blog in the database");
  }
});

// Get Blogs by Genre
app.get("/blogs/genre", async (req, res) => {
  const { genre } = req.query;
  try {
    const blogs = await UserBlog.find({ genre: new RegExp(genre, "i") });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).send("Error searching blogs by genre");
  }
});

// Get Blog by ID
app.get('/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await UserBlog.findById(id);
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).send("Blog not found");
    }
  } catch (error) {
    res.status(500).send("Error fetching blog");
  }
});





// Get 3 blogs, one from each genre
app.get("/fetch-feed", async (req, res) => {
  console.log("Fetching top 3 blogs");
  try {
    console.log("Fetching blogs from database...");
    const topBlogs = await UserBlog.find() 
    res.status(200).json(topBlogs);
  } catch (error) {
    res.status(500).send("Error fetching blogs");
  }
});





// Add comment and rating to a blog
app.post("/add-comment-rating/:blogId", async (req, res) => {
  const { blogId } = req.params;
  const { comment, rating = 5, user } = req.body;

  try {
    if (!user) {
      return res.status(403).send("You need to be logged in to comment.");
    }

    const blog = await UserBlog.findById(blogId);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    // Add the comment and rating
    blog.comments.push({ user, comment });
    if (rating >= 1 && rating <= 5) {
      blog.ratings.push(rating);
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).send("Error adding comment or rating");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
