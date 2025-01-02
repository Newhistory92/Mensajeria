const { Img }= require ("@react-email/components");
const  styles = require('./Header.module.css') 
const React = require('react');
function Header({ logoUrl }) {
  return (
    <div className={styles.header}>
      <Img src={logoUrl} alt="Logo" className={styles.logo} />
    </div>
  );
}

module.exports.Header = Header;