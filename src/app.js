const express = require("express");
const { userAuth } = require("./middlewares/auth.js");

const app = express();

// handling error in express
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send("Internal Server Error");
  }
  next();
});
// Should be at end
app.get("/", (req, res) => {
  throw new Error("This is a test error");
  res.send("Hello World");
});

// Using try-catch block to handle errors in async functions
app.get("/async", async (req, res, next) => {
  try {
    throw new Error("This is a test error in async function");
    res.send("Hello World");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// this will handle the get request to /user only
app.get("/user/:userId", userAuth, (req, res) => {
  // dynamic route parameter
  console.log(req.params.userId);

  // query parameter reading
  console.log(req.query);
  res.send({ firstName: "Nitish", lastName: "Mishra" });
});

app.listen(7777, () => {
  console.log("Server is running on port 7777");
});
