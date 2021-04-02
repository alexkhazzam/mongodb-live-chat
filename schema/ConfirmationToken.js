const mongoose = require('mongoose');

const ConfirmationToken = new mongoose.Schema(
  {
    token: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      expires: '1m',
      default: Date.now(),
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ConfirmationToken', ConfirmationToken);
