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
        <title className={classes.heroTextSection}>
          <Typography
            style={{
              fontSize: "3.3rem",
              fontWeight: 500,
              letterSpacing: "3px",
              color: "#f8f9fa",
              textTransform: "capitalize",
            }}
            variant="h1"
          >
            Comenta lo que quieras donde sea
          </Typography>

          <Typography
            style={{
              fontSize: "1.3rem",
              letterSpacing: 1,
              lineHeight: "33px",
              wordSpacing: 2,
              color: "#f8f9fa",
            }}
            variant="h3"
            color="textSecondary"
          >
            Con FreelyComment eres libre de expresar tus ideas en cualquier
            sitio web. Comenta sin restricciones en cualquier momento con tan
            solo un click!
          </Typography>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            style={{ width: 150, alignSelf: "flex-start" }}
          >
            Unete ya!
          </Button>
        </title>
        <figure className={classes.heroImgSection}>
          <img src={phoneblob} alt="phone" />
        </figure>
      </Container>
    </section>
  );
};

export default Hero;
