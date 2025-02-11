const {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} = require("@react-email/components");
import * as React from "react";

function NotificationEmail({
  userFirstName,
  loginDate,
  message,
  titulo,
  contenido,
}) {
  const formattedDate = new Intl.DateTimeFormat("es-AR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(loginDate);

  return (
    <Html>
      <Head />
      <Preview>Notificacion de Obra Social Provincia</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img src="https://i.postimg.cc/X71TTYWH/OSP.png" width={350} height={108} alt="Logo" />
          </Section>
          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={620}
                src="https://obrasocial.sanjuan.gob.ar/_next/image?url=%2Ftexturas-osp-5_2x.webp&w=1920&q=75"
                alt="Header"
              />
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                    textTransform: "capitalize"
                  }}
                >
                  Hola {userFirstName}
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {message}
                </Heading>

                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Referencia: </b>
                  {titulo}
                </Text>
                <div
                 style={{ ...paragraph, marginTop: -5 }}
                 dangerouslySetInnerHTML={{ __html: contenido }}
                  />
                  <Text style={paragraph}>
                    <b>Aviso: </b>
                    {formattedDate}
                  </Text>
                <Text
                  style={{
                    color: "rgb(0,0,0, 1)",
                    fontSize: 8,
                    lineHeight: 1.5
                  }}
                >
                ESTE MENSAJE FUE ORIGINADO DESDE UNA DIRECCIÓN DE CORREO ELECTRÓNICO QUE NO SE ENCUENTRA HABILITADA PARA RECIBIR MENSAJES. POR FAVOR NO RESPONDER AL MISMO. EL PRESENTE MAIL NO PODRÍA HABER SIDO ENVIADO SIN QUE UD. NOS PROPORCIONASE SU DIRECCIÓN DE CORREO ELECTRÓNICO. QUEDA BAJO SU EXCLUSIVA RESPONSABILIDAD INFORMAR A LA OBRA SOCIAL PROVINCIA DE CUALQUIER CAMBIO O MODIFICACIÓN QUE DICHA DIRECCIÓN SUFRIESE.EL TITULAR DE LOS DATOS PERSONALES TIENE LA FACULTAD DE EJERCER EL DERECHO DE ACCESO A LOS MISMOS EN FORMA GRATUITA A INTERVALOS NO INFERIORES A 6 MESES, SALVO QUE ACREDITE UN INTERÉS LEGÍTIMO AL EFECTO CONFORME LO ESTABLECIDO EN EL ART. 14 INC. 3. DE LA LEY N° 25.326. LA AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, EN SU CARÁCTER DE ÓRGANO DE CONTROL DE LA LEY N° 25.326, TIENE LA ATRIBUCIÓN DE ATENDER LAS DENUNCIAS Y RECLAMOS QUE INTERPONGAN QUIENES RESULTEN AFECTADOS EN SUS DERECHOS POR INCUMPLIMIENTO DE LAS NORMAS VIGENTES EN MATERIA DE PROTECCIÓN DE DATOS PERSONALES. EL CONTENIDO DEL PRESENTE MENSAJE ES PRIVADO, CONFIDENCIAL Y EXCLUSIVO PARA SU DESTINATARIO, PUDIENDO CONTENER INFORMACIÓN PROTEGIDA POR NORMAS LEGALES Y DE SECRETO PROFESIONAL. BAJO NINGUNA CIRCUNSTANCIA SU CONTENIDO PUEDE SER TRANSMITIDO O RELEVADO A TERCEROS NI DIVULGADO EN FORMA ALGUNA.
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
            <Column style={{ width: "100%" }}>
    <table align="center" role="presentation" style={{ margin: "0 auto" }}>
      <tr>
        <td>
          <Button style={button}>Más información</Button>
        </td>
      </tr>
    </table>
  </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img
              style={image}
              width={620}
              src="https://react-email-demo-lpdmf0ryo-resend.vercel.app/static/yelp-footer.png"
              alt="Footer"
            />
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © {new Date().getFullYear()} | Obra Social Provincia., Agustín Gnecco 360 (S)- 5400 | San Juan, Argentina | www.obrasocial.sanjuan.gob.ar
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
  justifyContent: "center",
  display: "inline-block",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};

module.exports = NotificationEmail;