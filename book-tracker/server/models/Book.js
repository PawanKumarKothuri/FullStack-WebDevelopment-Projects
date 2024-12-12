const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  status: { type: String, enum: ["Want to Read", "Currently Reading", "Finished Reading"], default: "Want to Read" },
  progress: { type: Number, default: 0 },
});

module.exports = mongoose.model("Book", bookSchema);
