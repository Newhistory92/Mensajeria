const { transporter } = require('.../config/mail');
const { render } = require('@react-email/render');
const EmailTemplate = require('.../templates/EmailTemplate.jsx');

async function sendEmail(to, titulo, contenido) {
    try {
        const emailHtml = render
        (EmailTemplate(
        { titulo,
        contenido,
        fecha: new Date().toLocaleDateString(),}));

        const mailOptions = {
            from: process.env.SMTP_FROM,
            to,
            subject: titulo,
            html: emailHtml
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('[EMAIL] Mensaje enviado:', info.messageId);
        return info;
    } catch (error) {
        console.error('[EMAIL] Error al enviar email:', error);
        throw error;
    }
}

module.exports = { sendEmail };