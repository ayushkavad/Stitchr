const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name.'],
    unique: [true, 'please provide another name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: [true, 'this email is already used please use another one.'],
    validate: {
      validator: function (el) {
        if (!validator.isEmail(el)) return false
      },
      message: 'Please provide valid email address.',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    lower: true,
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      validator: function (el) {
        return el !== this.password
      },
      message: 'Passwords are not same',
    },
  },
  photo: {
    type: String,
    default: 'defualt.png',
  },
  role: {
    type: String,
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
})

const User = mongoose.model('User', userSchema)

module.exports = User
