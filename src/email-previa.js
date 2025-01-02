const React = require('react');
const { render } = require('@react-email/render');
const NotificationEmail = require('./templates/EmailTemplate');
const fs = require('fs');
const path = require('path');


    async function previewEmail(titulo, contenido) {
        try {
            // Espera la resolución de render
            const emailHtml = await render(
                NotificationEmail({
                    titulo,
                    contenido,
                    fecha: new Date(),
                    actionUrl: 'http://localhost:3002'
                })
            );
    
            // Crear directorio preview si no existe
            const previewDir = path.join(__dirname, '../preview');
            if (!fs.existsSync(previewDir)){
                fs.mkdirSync(previewDir);
            }
    
            // Guardar el HTML generado
            const filePath = path.join(previewDir, 'email-preview.html');
            fs.writeFileSync(filePath, emailHtml);
    
            console.log(`Preview generado en: ${filePath}`);
            return filePath;
        } catch (error) {
            console.error('Error al generar preview:', error);
            throw error;
        }
    }
    
    module.exports = { previewEmail };