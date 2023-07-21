const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    comment: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

commentSchema.virtual('replies', {
  ref: 'Reply',
  foreignField: 'comment',
  localField: '_id',
})

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  })
  next()
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
