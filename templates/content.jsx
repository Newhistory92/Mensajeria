import { Text } from "@react-email/components";
import styles from './Content.module.css';

function Content({ titulo, contenido, fecha }) {
  const formattedDate = new Intl.DateTimeFormat("es-AR", {
    dateStyle: "long",
    timeStyle: "short"
  }).format(fecha);

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>{titulo}</h1>
      <div 
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: contenido }} 
      />
      <Text className={styles.date}>Fecha: {formattedDate}</Text>
    </div>
  );
}

module.exports = Content;