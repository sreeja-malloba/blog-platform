const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: String,
    text: String
});

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    comments: [commentSchema]
});

module.exports = mongoose.model("Post", postSchema);