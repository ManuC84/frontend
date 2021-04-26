import React from "react";
import makeStyles from "./styles";
import { Typography, Button, Container, Divider } from "@material-ui/core";
import phone from "../../../img/phone.png";
import phoneblob from "../../../img/phoneblob.png";

const Hero = () => {
  const classes = makeStyles();
  
  return (
    <section className={classes.mainSection}>
      <Container className={classes.heroContainer}>
        {/* TITTLE + TEXT */}
        <title className={classes.heroTextSection}>
          <Typography
            style={{
              fontFamily: 'MuseoModerno',
              fontSize: "2.8rem",
              fontWeight: 600,
              letterSpacing: "1.5px",
              color: "#f8f9fa",
            }}
            variant="h1">¿Qué es FreedlyComment?
          </Typography>

          <Typography
            style={{
              fontSize: "1.5rem",
              textAlign: "justify",
              fontWeight: 400,
              letterSpacing: "1px",
              lineHeight: "40px",
              wordSpacing: 2,
              color: "#f8f9fa",
            }}
            variant="h3"
            color="textSecondary"
          >
            Es una APP gratuita donde podrás expresar tus sugerencias, opiniones y recomendaciones de cualquier sitio web, sin límites ni restricciones en un solo click.
          </Typography>
          <Button
            size="large"
            color="primary" variant="contained"
            style={{ width: 150, alignSelf: "flex-start" }}
          >
            ¡ÚNETE YA!
          </Button>
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
