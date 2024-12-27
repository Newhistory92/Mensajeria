import { Text } from "@react-email/components";
import styles from './Footer.module.css';

function Footer() {
  return (
    <div className={styles.footer}>
      <Text className={styles.text}>
        © {new Date().getFullYear()} | Tu Empresa | Todos los derechos reservados
      </Text>
    </div>
  );
}

module.exports = Footer;