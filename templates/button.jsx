import styles from './Button.module.css';

function Button({ children, href }) {
  return (
    <a href={href} className={styles.button}>
      {children}
    </a>
  );
}

module.exports = Button;