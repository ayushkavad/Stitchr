const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, 'A post must have a caption.'],
    trim: true,
    maxlength: [300, 'A caption have less or equal then 300 characters'],
    minlength: [10, 'A caption must have more or equal then 10 characters'],
  },
  mediaContent: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
