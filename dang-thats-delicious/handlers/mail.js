const nodemailer = require('nodemailer')
const pug = require('pug')
const juice = require('juice')
const htmlToText = require('html-to-text')
const promisify = require('es6-promisify')
const postmarkTransport = require('nodemailer-postmark-transport')

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.MAIL_KEY)


// const msg = {
//   to: 'admin@admin.com',
//   from: 'test@example.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);

const transport = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
})

const generateHTML = (filename, options = {}) => {
	const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options)
	const inlined = juice(html)
	return inlined
}

exports.send = async (options) => {
	const html = generateHTML(options.filename, options)
	const text = htmlToText.fromString(html)
	const mailOptions = {
		to: options.user.email,
		html,
		text
	}
	console.log(text)
	const sendMail = promisify(transport.sendMail, transport)
	return await sendMail(mailOptions)
}

transport.sendMail({
	from: 'Setemi <setemi@gmail.com>',
	to: 'admin@admin.com',
	subject: 'Hi',
	html: 'Hello I <strong>love you</strong>',
	text: 'Hey I love you'
}, (err) => {
	if (err) {
		console.error(err)
	}
})