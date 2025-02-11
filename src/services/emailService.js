const { transporter } = require('../config/mail');
const { render } = require('@react-email/render');
const NotificationEmail = require('../templates/EmailTemplate');
async function sendEmail(mail, titulo, receptorName, contenido) {
    try {
        // Validación estricta del email
        const destinatario = mail || to;
        
        if (!destinatario || typeof destinatario !== 'string' || !destinatario.includes('@')) {
            throw new Error(`Email inválido: ${destinatario}`);
        }

        const emailHtml = await render(
            NotificationEmail({
                userFirstName: receptorName,
                loginDate: new Date(),
                message: "Tienes un nuevo mensaje en tu cuenta de Obra Social Provincia",
                titulo: titulo,
                contenido: contenido
            })
        );

        // Construir mailOptions de manera más explícita
        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: destinatario.trim(), 
            subject: titulo,
            html: emailHtml,
            envelope: {
                from: process.env.SMTP_FROM,
                to: destinatario.trim()
            }
        };
      

        const info = await transporter.sendMail(mailOptions);
       
        
        return info;
    } catch (error) {
        // Log detallado del error
        console.error('[EMAIL] Error detallado:', {
            message: error.message,
            code: error.code,
            command: error.command,
            stack: error.stack,
            responseCode: error.responseCode,
            response: error.response
        });
        throw error;
    }
}



module.exports = { sendEmail };