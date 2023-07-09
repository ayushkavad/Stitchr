const path = require('path')
const multer = require('multer')

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
    return cb(new Error('Only images and videos are allowed!'))

  cb(null, true)
}

const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
})

exports.uploadImageCover = upload.single('mediaContent')
