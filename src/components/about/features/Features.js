import React from "react";
import { Container, Typography, Button, Divider } from "@material-ui/core";
import features1 from "../../../img/features1.png";
import features2 from "../../../img/features2.png";
import features3 from "../../../img/features3.png";
import makeStyles from "./styles";

const Features = () => {
  const classes = makeStyles();

  return (
    <section className={classes.mainSection}>
      <Container className={classes.featuresContainer}>
        <article className={classes.article}>
          <img src={features1} alt="features1" />
          
          <div className={classes.textSection}>

            <Typography
              variant="h4"
              color="textPrimary"
              style={{ 
                fontWeight: 500,
                fontFamily: 'MuseoModerno' }}
            >
              ¿Cómo funciona?
            </Typography>

            <Typography variant="body1" color="textSecondary">
              Es tan fácil cómo:
              <li>Crear tu cuenta </li>
              <li>Copiar la url de la web que quieres comentar.</li>
              <li>Pegarla en tu perfil y escribir lo que te apetezca.</li>
              A partir de aquí podrás ver todo lo que se dice de esa url aunque la web inicial no tenga activados los comentarios.
            </Typography>

            <Button variant="outlined" color="primary" style={{ width: "40%" }}>
              CREAR CUENTA
            </Button>
          </div>

        </article>
        <Divider />
        <article className={classes.article}>
          <div className={classes.textSection}>
            <Typography
              variant="h4"
              color="textPrimary"
              style={{ fontWeight: 500,
                fontFamily: 'MuseoModerno'  }}
            >
              Descárgate el plugin para el navegador
            </Typography>

            <Typography variant="body1" color="textSecondary">
              <li>Accede a los comentarios con un solo click desde el mismo navegador.</li>
              <li>La extensión de navegador también te permite conocer cuantos comentarios y me gusta tiene la página que estás visitando sin necesidad de abrir una nueva pestaña!</li>
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              style={{ width: "40%" }}
            >
              DESCARGAR
            </Button>
          </div>
          <img src={features2} alt="features2" />
        </article>

        <Divider />
        <article className={classes.article}>
          <img src={features3} alt="features3" />
          <div className={classes.textSection}>
            <Typography
              variant="h4"
              color="textPrimary"
              style={{ fontWeight: 500,
                fontFamily: 'MuseoModerno'  }}
            >No te pongas límites
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Comenta acerca de cualquier negocio local de tu ciudad, busca tus temas favoritos y las últimas noticias, incluso si no tienen una página web propia.
            </Typography>
            <Button variant="outlined" color="primary" style={{ width: "40%" }}>
              ¿TE ANIMAS?
            </Button>
          </div>
        </article>
      </Container>
    </section>
  );
};

export default Features;
