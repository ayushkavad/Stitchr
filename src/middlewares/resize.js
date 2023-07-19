const sharp = require('sharp')

exports.resizeUserPhoto = (req, res, next) => {
  if (!req.file) next()

  req.file.filename = `${Date.now()}.jpeg`

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/users/${req.file.filename}`)

  next()
}
