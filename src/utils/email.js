const nodemailer = require('nodemailer')

module.exports = async (option) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: 'John Devid <theak5410@gmail.com>',
    to: option.email,
    subject: 'Your Stitchr reset password request',
    text: `A request has been received to change the password for your stitchr account. ${option.resetToken}`,
  }

  await transporter.sendMail(mailOptions)
}
