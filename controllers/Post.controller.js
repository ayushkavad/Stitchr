const Post = require('./../models/Post.model')

const getAll = async (req, res) => {
  try {
    const data = await Post.find()

    res.status(200).json({
      status: 'success',
      data: {
        data,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

const getOne = async (req, res) => {
  try {
    const data = await Post.create(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        data,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

const createOne = async (req, res) => {
  try {
    const data = await Post.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: {
        data,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

const updateOne = async (req, res) => {
  console.log(req.params.id)
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
  } catch (error) {
    console.log(error)
  }
}

const deleteOne = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'success',
      data: {
        data: null,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
}
