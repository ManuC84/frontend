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
              style={{ fontWeight: 500 }}
            >
              Una cuenta para comentar en toda la web
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Comenta y da tu opinión sobre cualquier sitio web de forma fácil e
              instantanea. No te preocupes si los comentarios están desactivados
              o si una página web ni siquiera tiene comentarios. Tampoco dejes
              que ciertas moderaciones injustas te impidan expresar tus ideas.{" "}
            </Typography>
            <Button variant="outlined" color="primary" style={{ width: "40%" }}>
              Empieza a comentar
            </Button>
          </div>
        </article>
        <Divider />
        <article className={classes.article}>
          <div className={classes.textSection}>
            <Typography
              variant="h4"
              color="textPrimary"
              style={{ fontWeight: 500 }}
            >
              Extensión de navegador para una experiencia inmediata
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Accede a los comentarios con un solo click desde el mismo
              navegador. La extensión de navegador también te permite conocer
              cuantos comentarios y me gusta tiene la página que estás visitando
              sin necesidad de abrir una nueva pestaña!
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              style={{ width: "40%" }}
            >
              Bajate el plug-in
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
              style={{ fontWeight: 500 }}
            >
              No solo te limites a comentar en páginas web
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Comenta acerca de cualquier negocio local de tu ciudad, incluso si
              no tienen una página web propia!
            </Typography>
            <Button variant="outlined" color="primary" style={{ width: "40%" }}>
              Prueba este servicio
            </Button>
          </div>
        </article>
      </Container>
    </section>
  );
};

export default Features;
