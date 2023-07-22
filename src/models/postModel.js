const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
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
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
})

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-__v -passwordChangedAt -role -likesPhoto',
  }).populate({
    path: 'comments',
    select: '-__v',
    populate: {
      path: 'replies',
      select: '-__v',
      populate: {
        path: 'user',
        select: 'name photo',
      },
    },
  })
  next()
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
