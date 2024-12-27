import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
} from "@react-email/components";
import { Header } from './components/Header/Header';
import { Content } from './components/Content/Content';
import { Button } from './components/Button/Button';
import { Footer } from './components/Footer/Footer';
import styles from './NotificationEmail.module.css';

function NotificationEmail({ titulo, contenido, fecha, actionUrl }) {
  return (
    <Html>
      <Head />
      <Preview>{titulo}</Preview>
      <Body className={styles.main}>
        <Container>
          <Header logoUrl="/static/logo.png" />
          
          <Section className={styles.section}>
            <Content 
              titulo={titulo}
              contenido={contenido}
              fecha={fecha}
            />
            
            {actionUrl && (
              <div className={styles.buttonContainer}>
                <Button href={actionUrl}>
                  Ver más detalles
                </Button>
              </div>
            )}
          </Section>

          <Footer />
        </Container>
      </Body>
    </Html>
  );
}

module.exports = NotificationEmail;