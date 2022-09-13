const mongoose = require('mongoose')

const Chat = mongoose.Schema(
  {
    message: {
      text: { type: String },
      audioUrl: { type: String },
      imageUrl: { type: String },
    },
    timeDetails: {
      deliverAt: { type: Date },
      seenAt: { type: Date },
    },
    sentBy: { type: String, required: true },
    sentTo: { type: String, required: true },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Chats', Chat)
