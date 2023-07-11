const path = require('path')
const multer = require('multer')
const AppError = require('./../utils/appError')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1]
    cb(null, `${Date.now()}.${extension}`)
  },
})

const multerFilter = (req, file, cb) => {
  var ext = path.extname(file.originalname)

  if (!['.png', '.mp4', '.jpeg'].includes(ext))
    return cb(new AppError('Only images and videos are allowed!', 400), false)

  cb(null, true)
}

const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
})

// exports.resizeUserPhoto = (req, res, next) => {
//   if (!req.file) next()

//   req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`

//   sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     .toFile(`public/images/${req.file.filename}`)

//   next()
// }

exports.uploadImageCover = upload.single('mediaContent')
