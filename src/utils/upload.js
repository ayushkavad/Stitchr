const path = require('path')
const multer = require('multer')
const AppError = require('./../utils/appError')

const multerUpload = (storage, fileFilter) => {
  return {
    storage,
    fileFilter,
  }
}

// post image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/posts')
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1]
    cb(null, `${Date.now()}.${extension}`)
  },
})

const multerFilterPost = (req, file, cb) => {
  var ext = path.extname(file.originalname)

  if (!['.png', '.mp4', '.jpeg', '.jpg'].includes(ext))
    return cb(new AppError('Only images and videos are allowed!', 400), false)

  cb(null, true)
}

const upload = multer(multerUpload(storage, multerFilterPost))

exports.uploadImageCover = upload.single('mediaContent')

// user image upload
const multerStorageUser = multer.memoryStorage()

const multerFilterUser = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new AppError('Not an image! please upload image.', 400), false)
  }
}

const uploadUser = multer(multerUpload(multerStorageUser, multerFilterUser))

exports.uploadUserPhoto = uploadUser.single('photo')
