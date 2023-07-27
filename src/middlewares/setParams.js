exports.setDefaultValuePost = (req, res, next) => {
  if (!req.body.mediaContent) req.body.mediaContent = req.file?.path
  next()
}

exports.setDefaultValueComment = (req, res, next) => {
  if (!req.body.post) req.body.post = req.params.postId
  next()
}

exports.setDefaultValueReply = (req, res, next) => {
  if (!req.body.comment) req.body.comment = req.params.commentId
  next()
}
