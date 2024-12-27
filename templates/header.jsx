import { Img } from "@react-email/components";
import styles from './Header.module.css';

function Header({ logoUrl }) {
  return (
    <div className={styles.header}>
      <Img src={logoUrl} alt="Logo" className={styles.logo} />
    </div>
  );
}

module.exports = Header;