const styles = require ('./Button.module.css');
const React = require('react');
function Button({ children, href }) {
  return (
    <a href={href} className={styles.button}>
      {children}
    </a>
  );
}

module.exports.Button = Button;