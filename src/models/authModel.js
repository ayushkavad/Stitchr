const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'please provide your email.'],
    unique: true,
    lower: true,
    validate: [validator.isEmail, 'Please provide your valid email.'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: [true, 'Please provide your password.'],
    minlength: 8,
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
  role: {
    type: String,
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
})

authSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 14)

  this.passwordConfirm = undefined

  next()
})

authSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt = Date.now() - 1000
  next()
})

authSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } })
  next()
})

authSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

authSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    )

    return JWTTimestamp < changedTimestamp
  }

  return false
}

authSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

const Auth = mongoose.model('Auth', authSchema)

module.exports = Auth
