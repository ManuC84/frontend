import React from "react";
import { Container, Typography, Button, Divider, List, ListItem } from "@material-ui/core";
// import features1 from "../../../img/features1.png";
// import features2 from "../../../img/features2.png";
// import features3 from "../../../img/features3.png";
import features11 from "../../../img/1.png";
import features22 from "../../../img/2.png";
import features33 from "../../../img/3.png";
import makeStyles from "./styles";

const Features = () => {
  const classes = makeStyles();

  return (
    <section className={classes.mainSection}>

      <Container className={classes.featuresContainer}>
        
        {/* ¿CÓMO FUNCIONA? */}
        <article className={classes.article}>
          <img src={features11} alt="features1" />

          <List className={classes.textBox}>
            <div className={classes.TittleSection}>¿Cómo funciona?</div>
            <ListItem>
              <div className={classes.ListNum}>1</div>
              <div className={classes.ListText}>Creas tu cuenta en FreelyComment</div>
            </ListItem>
            <ListItem>
              <div className={classes.ListNum}>2</div>
              <div className={classes.ListText}>Copias la url de la web que quieres comentar</div>
            </ListItem>
            <ListItem>
              <div className={classes.ListNum}>3</div>
              <div className={classes.ListText}>Pegas la url en tu perfil</div>
            </ListItem>
            <ListItem>
              <div className={classes.ListNum}>4</div>
              <div className={classes.ListText}>¡Y listos!</div>
            </ListItem>
            <ListItem><Button className={classes.ColorButton}>CREAR CUENTA</Button> </ListItem>
          </List>
        </article>

        {/* DESCÁRGATE EL PLUGIN */}
        <Divider />
        <article className={classes.article}>
          <List className={classes.textBox}>
            <div className={classes.TittleSection}>Descárgate el plugin</div>
            <List className={classes.ListText}>
              <ListItem>Accede a los comentarios con un solo click desde el mismo navegador.</ListItem>
              <ListItem>La extensión de navegador también te permite conocer cuantos comentarios y me gusta tiene la página que estás visitando sin necesidad de abrir una nueva pestaña.</ListItem>
            </List>
            <ListItem><Button className={classes.ColorButton}>DESCARGAR</Button> </ListItem>
          </List>
          <img src={features22} alt="features2" />
        </article>
        <Divider />

        {/* NO TE PONGAS LIMITES */}
        <article className={classes.article}>
          <img src={features33} alt="features3" />
          <div className={classes.textBox}>
            <div className={classes.TittleSection}>No te pongas límites</div>
            <div className={classes.ListText}>Comenta acerca de cualquier negocio local de tu ciudad, busca tus temas favoritos y las últimas noticias, incluso si no tienen una página web propia.</div>
            <Button className={classes.ColorButton}>¿TE ANIMAS? </Button>
          </div>
        </article>
      
      </Container>
    
    </section >
  );
};

export default Features;
