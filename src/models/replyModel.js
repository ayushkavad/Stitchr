const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
  reply: String,
  createdAt: {
    type: Date,
    defualt: Date.now,
  },
  comment: {
    type: mongoose.Schema.ObjectId,
    ref: 'Comment',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
})

replySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  })
  next()
})

const Reply = mongoose.model('Reply', replySchema)

module.exports = Reply
