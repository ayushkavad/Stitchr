const mongoose = require('mongoose')

const postModel = new mongoose.Schema({
  caption: {
    type: String,
  },
})

const Post = mongoose.model('Post', postModel)

module.exports = Post
