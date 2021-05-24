import React from "react";
import makeStyles from "./styles";
import { Grid, Button } from "@material-ui/core";
import imgHero from "../../../img/img_hero.png";
import "./stylesWave.css";

const Hero = () => {
  const classes = makeStyles();

  return (
    <section className={classes.mainSection}>
      <div className="box">
        <div className="wave -three"></div>
      </div>

      <Grid container>
        <Grid item lg={6} md={6} sm={12} style={{ padding: 60 }}>
          {/* TITTLE + TEXT */}
          <title className={classes.heroTextSection}>
            <div className={classes.TitleSection}>
              Comenta lo que quieras, cuándo y dónde sea.
            </div>
            <div className={classes.Subtitol}>
              Comparte tus recomendaciones de cualquier sitio web, comercio
              local o aficiones en un solo click.
            </div>
            <Button className={classes.ColorButton}>¡ÚNETE YA!</Button>
          </title>
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          sm={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {/* IMAGE */}
          <figure
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={imgHero} alt="presentation" className={classes.heroImg} />
          </figure>
        </Grid>
      </Grid>
    </section>
  );
};

export default Hero;
