import React from "react";
import makeStyles from "./styles";
import { Button, Container } from "@material-ui/core";
// import phoneblob from "../../../img/phoneblob.png";
import phoneblob from "../../../img/4.png";

const Hero = () => {
  const classes = makeStyles();

  return (
    <section className={classes.mainSection}>

      <Container className={classes.heroContainer}>

        {/* TITTLE + TEXT */}
        <title className={classes.heroTextSection}>
          <div className={classes.TitleSection}>¿Qué es FreelyComment?</div>
          <div className={classes.Subtitol}>Es una APP gratuita donde podrás expresar tus sugerencias, opiniones y recomendaciones de cualquier sitio web, sin límites ni restricciones en un solo click.</div>
          <Button className={classes.ColorButton}>¡ÚNETE YA!</Button>
        </title>
        
        {/* IMAGE */}
        <figure className={classes.heroImgSection}>
          <img src={phoneblob} alt="phone" />
        </figure>

      </Container>
    </section>
  );
};

export default Hero;
