const nodemailer = require('nodemailer')
const SMTP_CONFIG = require('../config/smtp')

module.exports = async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
      secure: false,
      auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    })
    const code = Math.random().toString(36).substring(7)
    const userEmail = req.user.email
    console.log(userEmail)

    await transporter.sendMail({
      text: 'Código para recuperação de senha',
      subject: 'Código para recuperação de senha',
      from: `Equipe Adapto <${SMTP_CONFIG.user}`,
      to: [SMTP_CONFIG.user, userEmail],
      html: `
        <html>
        <body>
          <strong>${code}</strong>
        </body>
      </html> 
        `
    })
    req.recover = {
      code: code
    }

    return next()
  } catch (error) {
    console.error(error)
    return res.status(error.status).json(error.message)
  }
}
