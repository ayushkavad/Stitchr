const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { default: isEmail } = require('validator/lib/isEmail')

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
    validate: [isEmail, 'Please provide your valid email.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    lower: true,
    validate: {
      validator: function (el) {
        return el.length >= 8
      },
      message: 'Password must be 8 characters long',
    },
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      validator: function (el) {
        return el === this.password
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

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  this.passwordConfirm = undefined

  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
  password
) {
  return await bcrypt.compare(candidatePassword, password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
