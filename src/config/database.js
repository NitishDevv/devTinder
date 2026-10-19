const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://admin:AsluBxl7TweCrFt1@namastenode.2fjg9ph.mongodb.net/devTinder",
  );
}

module.exports = connectDB;