const Comment = require('./../models/commentModel')
const factory = require('./handlerFactory')

exports.getAllComment = factory.getAll(Comment)
exports.getComment = factory.getOne(Comment)
exports.createComment = factory.createOne(Comment)
exports.updateComment = factory.updateOne(Comment)
exports.deleteComment = factory.deleteOne(Comment)
