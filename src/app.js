const express = require("express");

const app = express();

// this will handle the get request to /user only
app.get("/user", (req, res) => {
  res.send({ firstName: "Nitish", lastName: "Mishra" });
});

// this will handle the post request to /user only
app.post("/user", (req, res) => {
  res.send({ firstName: "Nitish", lastName: "Mishra" });
});

//  this will handle all the request to /test
app.use("/test", (req, res) => {
  res.send("Hello Test");
});

app.listen(7777, () => {
  console.log("Server is running on port 3000");
});
