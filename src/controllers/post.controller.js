const path = require('path')
const multer = require('multer')
const Post = require('../models/post.model')

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

exports.getAll = async (req, res, next) => {
  try {
    const data = await Post.find().select('-__v')

    res.status(200).json({
      status: 'success',
      data: {
        data,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

exports.getOne = async (req, res, next) => {
  try {
    const data = await Post.findById(req.params.id).select('-__v')

    res.status(200).json({
      status: 'success',
      data: {
        data,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

exports.createOne = async (req, res, next) => {
  try {
    if (!req.body.mediaContent) req.body.mediaContent = req.file?.path
    const data = await Post.create(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        data,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

exports.updateOne = async (req, res, next) => {
  try {
    const data = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      status: 'success',
      data: {
        data,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

exports.deleteOne = async (req, res, next) => {
  try {
    await await Post.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'success',
      data: {
        data: null,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
