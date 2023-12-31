const nodemailer = require('nodemailer')

module.exports = async ({ email, resetURL: resetToken }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: 'John Devid <me@gmail.com>',
    to: email,
    subject: 'Your Stitchr reset password request',
    text: `A request has been received to change the password for your stitchr account. ${resetToken}`,
  }

  await transporter.sendMail(mailOptions)
}
