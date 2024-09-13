const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const UserBlog = require("./models/UserBlog");

const app = express();
const port = 3001;

mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();
    res.status(201).send("User saved successfully");
  } catch (error) {
    res.status(500).send("Error saving user to database");
  }
});

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

// Search blog by heading
app.get("/search", async (req, res) => {
  const { heading } = req.query;
  try {
    const blog = await UserBlog.findOne({ heading: new RegExp(heading, "i") }); // Case-insensitive search
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).send("Blog not found");
    }
  } catch (error) {
    res.status(500).send("Error searching blog in the database");
  }
});

// Add comment and rating to a blog
app.post("/add-comment-rating/:blogId", async (req, res) => {
  const { blogId } = req.params;
  const { comment, user, rating = 5 } = req.body; // Default rating is 5 if not provided

  try {
    const blog = await UserBlog.findById(blogId);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    // Add the comment and default rating if no rating is provided
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});







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
//   console.log("Name:", name);
//   console.log("Email:", email);
//   console.log("Password:", password);

//   try {
//     const user = new User({
//       name,
//       email,
//       password,
//     });
//     await user.save();
//     console.log("User saved to database:", user);
//     res.status(201).send("User saved successfully");
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Error saving user to database");
//   }
// });

// app.post("/create", async (req, res) => {
//   const { heading, description, content, genre, email } = req.body; // Added genre here
//   console.log("heading:", heading);
//   console.log("description:", description);
//   console.log("content:", content);
//   console.log("genre:", genre);

//   try {
//     const userBlog = new UserBlog({
//       email,
//       heading,
//       description,
//       content,
//       genre,  // Store genre in the database
//       createdAt: Date.now()  // Automatically set createdAt
//     });
//     await userBlog.save();
//     console.log("Blog saved to database:", userBlog);
//     res.status(201).json(userBlog);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Error saving blog to database");
//   }
// });

// // Search blog by heading
// app.get("/search", async (req, res) => {
//   const { heading } = req.query;
//   try {
//     const blog = await UserBlog.findOne({ heading: new RegExp(heading, 'i') }); // Search case-insensitive
//     if (blog) {
//       res.status(200).json(blog);
//     } else {
//       res.status(404).send("Blog not found");
//     }
//   } catch (error) {
//     console.error("Error searching blog:", error);
//     res.status(500).send("Error searching blog in the database");
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email, password });
//     if (user) {
//       console.log("ok");
//       res.status(200).send("Login successful"); // Send a success response
//     } else {
//       console.log("not ok");
//       res.status(401).send("Invalid email or password"); // Send a failure response
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });