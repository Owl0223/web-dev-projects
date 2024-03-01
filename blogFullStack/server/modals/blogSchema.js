const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  blog: [
    {
      subtitle: {
        type: String,
        // required: true,
      },
      content: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  
});

const BlogPost = mongoose.model('BlogPost', blogSchema);

module.exports = BlogPost;