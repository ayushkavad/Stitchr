const Reply = require('./../models/replyModel')
const factory = require('./handlerFactory')

exports.getAllReply = factory.getAll(Reply)
exports.getReply = factory.getOne(Reply)
exports.createReply = factory.createOne(Reply)
exports.updateRelpy = factory.updateOne(Reply)
exports.deleteReply = factory.deleteOne(Reply)
