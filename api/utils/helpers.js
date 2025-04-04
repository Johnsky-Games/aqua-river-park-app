const transporter = require('../config/mailer');
const templates = require('./emailTemplates');

async function sendMail(to, subject, type, token) {
    let html = '';
    if (type === 'confirm') html = templates.confirmAccount(token);
    if (type === 'reset') html = templates.resetPassword(token);

    const info = await transporter.sendMail({
        from: 'Aqua River Park <no-reply@aquariver.com>',
        to,
        subject,
        html
    });

    console.log('Correo enviado:', info.messageId);
    return info;
}

module.exports = { sendMail };