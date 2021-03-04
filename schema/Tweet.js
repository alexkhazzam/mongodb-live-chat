const mongoose = require('mongoose');

const Post = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    pinned: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', Post);
