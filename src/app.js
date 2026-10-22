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
app.get("/user", async (req, res) => {
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

// Delete user by Id

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    if (deleteUser) {
      res.send("User deleted successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send("Error deleting user");
  }
});

// update data of user

app.patch("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const UpdateData = req.body;
    const updatedUser = await User.findByIdAndUpdate({_id : userId}, UpdateData);
    if (updatedUser) {
      res.send(updatedUser);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.log(err);
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
