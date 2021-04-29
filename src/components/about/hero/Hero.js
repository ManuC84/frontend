import React from "react";
import makeStyles from "./styles";
import { Button, Container, Grid } from "@material-ui/core";
// import phoneblob from "../../../img/phoneblob.png";
import phoneblob from "../../../img/4.png";

const Hero = () => {
  const classes = makeStyles();

  return (
    <section className={classes.mainSection}>
      <Grid container style={{ padding: 20 }}>
        <Grid item lg={6} md={6} sm={12} style={{ padding: 60 }}>
          {/* TITTLE + TEXT */}
          <title className={classes.heroTextSection}>
            <div className={classes.TitleSection}>¿Qué es FreelyComment?</div>
            <div className={classes.Subtitol}>
              Es una APP gratuita donde podrás expresar tus sugerencias,
              opiniones y recomendaciones de cualquier sitio web, sin límites ni
              restricciones en un solo click.
            </div>
            <Button className={classes.ColorButton}>¡ÚNETE YA!</Button>
          </title>
        </Grid>
        <Grid item lg={6} md={6} sm={12}>
          {/* IMAGE */}
          <figure>
            <img
              src={phoneblob}
              alt="phone"
              className={classes.heroImgSection}
            />
          </figure>
        </Grid>
      </Grid>
    </section>
  );
};

export default Hero;
