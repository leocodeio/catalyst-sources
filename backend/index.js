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
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Password:", password);

  try {
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();
    console.log("User saved to database:", user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error saving user to database");
  }
});

app.post("/create", async (req, res) => {
  const { heading, description, content } = req.body;
  console.log("heading:", heading);
  console.log("description:", description);
  console.log("content:", content);
  const email = "t@t.c";
  
  try {
    const user = new UserBlog({
      email,
      heading,
      description,
      content,
    });
    await user.save();
    console.log("Blog saved to database:", user);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error saving blog to database");
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      console.log("ok");
      res.status(200).send("Login successful"); // Send a success response
    } else {
      console.log("not ok");
      res.status(401).send("Invalid email or password"); // Send a failure response
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
