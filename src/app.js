const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUp } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();
// changed email for commits
// Middleware to parse JSON request bodies
app.use(express.json());

// Signup route
app.post("/signup", async (req, res) => {
  try {
    // validate the request body
    validateSignUp(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the passwoerd before saving to the database

    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const saved = await user.save();
    console.log(saved);
    res.send("User created successfully");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

// Login route

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.comapare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }
    res.status(200).send("Login Successful");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
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

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const updateData = req.body;

  try {
    const ALLOWED_UPDATES = ["age", "gender", "photoUrl", "about", "skills"];
    const isUpdateAllowed = Object.keys(updateData).every((key) =>
      ALLOWED_UPDATES.includes(key),
    );
    if (!isUpdateAllowed) {
      return res.status(400).send("Invalid updates");
    }
    if (updateData.skills.length > 10) {
      console.log(updateData.skills.length);
      throw new Error("Skills cannot be more than 10");
    }

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      updateData,
      {
        runValidators: true,
      },
    );
    if (updatedUser) {
      res.send(updatedUser);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
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
