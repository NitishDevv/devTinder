const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  const saved = await user.save();
  console.log(saved);
  res.send("User created successfully");
});

// find users with email
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({ emailId: req.query.emailId });
    if (users.length > 0) {
      res.send(users);
    } else {
      res.send("No user found");
    }
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

// feed api to get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.send(users);
    } else {
      res.send("No users found");
    }
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
