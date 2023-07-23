const Post = require('./../models/postModel')
const factory = require('./handlerFactory')

exports.getAllPost = factory.getAll(Post)
exports.getPost = factory.getOne(Post)
exports.createPost = factory.createOne(Post)
exports.updatePost = factory.updateOne(Post)
exports.deletePost = factory.deleteOne(Post)
