const nodemailer = require('nodemailer')
const pug = require('pug')
const juice = require('juice')
const htmlToText = require('html-to-text')
const promisify = require('es6-promisify')
// const postmarkTransport = require('nodemailer-postmark-transport')

const sgMail = require('@sendgrid/mail')
const sgTransport = require('nodemailer-sendgrid-transport')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const transport = nodemailer.createTransport(sgTransport(
	{
		// host: process.env.MAIL_HOST,
		// port: process.env.MAIL_PORT,
		service: 'SendGrid',
		auth: {
			// user: process.env.MAIL_USER,
			// pass: process.env.MAIL_PASS,
			// api_key: process.env.SENDGRID_API_KEY,
			api_user: process.env.SENDGRID_USER,
			api_key: process.env.SENDGRID_PASS,
		}
	}
))

const generateHTML = (filename, options = {}) => {
	const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options)
	const inlined = juice(html)
	return inlined
} 

exports.send = async (options) => {
	const html = generateHTML(options.filename, options)
	const text = htmlToText.fromString(html)
	const mailOptions = {
		from: 'Admin<noreply@stores-app.com>',
		to: options.user.email,
		subject: options.subject,
		html,
		text
	}
	// console.log(mailOptions)
	const sendMail = promisify(transport.sendMail, transport)
	return sendMail(mailOptions)
}
