const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/blogFull";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to DB...");
  } catch (error) {
    console.log("Error connecting to DB...\n" + error);
  }
};

module.exports = connectToMongo;