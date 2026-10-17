const express = require("express");

const app = express();

// this will handle the get request to /user only
app.get("/user/:userId", (req, res) => {
    // dynamic route parameter
    console.log(req.params.userId);

    // query parameter reading
    console.log(req.query);
  res.send({ firstName: "Nitish", lastName: "Mishra" });
});


app.listen(7777, () => {
  console.log("Server is running on port 3000");
});
