const nodemailer = require('nodemailer')
const SMTP_CONFIG = require('../config/smtp')

module.exports = async (req, res) => {
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

    await transporter.sendMail({
      text: 'Variavel Texto',
      subject: 'Variavel assunto',
      from: `Equipe Adapto <${SMTP_CONFIG.user}`,
      to: [SMTP_CONFIG.user],
      html: `
        <html>
        <body>
          <strong>Test</strong>
        </body>
      </html> 
        `
    })
  } catch (error) {
    console.error(error)
    return res.status(error.status).json(error.message)
  }
}
