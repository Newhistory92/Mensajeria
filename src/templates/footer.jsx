const { Text } = require ("@react-email/components");
const styles = require('./Footer.module.css');
const React = require('react');
function Footer() {
  return (
    <div className={styles.footer}>
      <Text className={styles.text}>
        © {new Date().getFullYear()} | Obra Social Provincia | Todos los derechos reservados
      </Text>
    </div>
  );
}

module.exports.Footer = Footer;