const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  genre: { type: String },
  status: { type: String, enum: ["Want to Read", "Currently Reading", "Finished Reading"] },
  progress: { type: Number, default: 0 },
});

module.exports = mongoose.model("Book", bookSchema);
