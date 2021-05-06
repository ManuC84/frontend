import React from "react";
import makeStyles from "./styles";
import classNames from 'classnames';
import { Button, List, ListItem, Card, Grid } from "@material-ui/core";
// ILLUSTRATION
import imgPlugin from "../../../img/imgPlugin.png";
import imgComercio from "../../../img/imgComercio.png";
import imgGeolocalizacion from "../../../img/imgGeolocalizacion.png";
// ICONS
import login from "../../../img/login.svg";
import copy from "../../../img/copy.svg";
import url from "../../../img/url.svg";
import comment from "../../../img/comment.svg";


const Features = () => {
  const classes = makeStyles();

  return (
    <section className={classes.mainSection}>
      <Grid>
              
        {/* COMERCIO LOCAL */}
        <article className={classNames(classes.article)} >
          <img src={imgComercio} alt="comercio" className={classes.img} />
          <div className={classes.Box1}>
            <div className={classes.Tittle1}>Comercio local</div>
            <div className={classes.ListText2}>
              <ListItem><span>Interactúa con los <b>comercios de tu barrio</b> a través de tu móvil de forma sencilla, escanea el codigo QR y entra directo a comentar con la comunidad.</span> </ListItem>
              <ListItem className={classes.Tittle1} >¿Eres comerciante?</ListItem>
              <ListItem><span>Aquí tendrás tu espacio para darte a conocer y publicitarte.</span></ListItem>

            </div>
            <Button className={classes.ColorButton}>¿TE ANIMAS? </Button>
          </div>
        </article>

        {/* GEOLOCALIZACIÓN */}
        <div className={classes.sectionBackground}>
          <article className={classNames(classes.article)} >
            <div className={classes.Box2}>
              <div className={classes.Tittle2}>Encuentra lo que necesitas</div>
              <div className={classes.ListText2}>
                <ListItem><span>Gracias a la <b>geolocalización</b> podrás encontrar aquel comercio que necesitas estés dónde estés e interactuar para saber qué opinan los demás.</span> </ListItem>
              </div>
              <Button className={classes.ColorButton}>BUSCAR </Button>
            </div>
            <img src={imgGeolocalizacion} alt="geolocalizacion" className={classes.img} />
          </article>
        </div>

        <div className={classes.pluginBackground}>

          {/* DESCÁRGATE EL PLUGIN */}
          <article className={classNames(classes.article)} >
            <img src={imgPlugin} alt="plugin" className={classes.img} />
            <List className={classes.Box3}>
              <ListItem className={classes.Tittle1}>Descárgate el plugin</ListItem>
              <div className={classes.ListText}>
                <ListItem><span>Házlo aún más fácil con el <b>plugin</b> para Chrome.</span> </ListItem>
                <ListItem><span>Podrás añadir la url y los comentarios en un click.</span></ListItem>
              </div>
              <Button className={classes.ColorButton}>DESCARGAR</Button>{" "}
            </List>
          </article>
        </div>
        <Grid item lg={8} sm={12} xs={12}>

          <article className={classNames(classes.article)} >
       
          <div className={classes.Box4}>
            {/* TITTLE */}
            <div className={classes.Tittle1}>¿Cómo funciona?</div>
            {/* CARDS */}
            <List>
              <List className={classes.cards}>
                <ListItem><img className={classes.icons} src={login} alt="login" /></ListItem>
                <ListItem className={classes.ListNum}>1<div className={classes.textCards}> Creas tu cuenta en Freely Comment</div>
                </ListItem>
              </List>

              <List className={classes.cards}>
                <ListItem><img className={classes.icons} src={copy} alt="copy" /></ListItem>
                <ListItem className={classes.ListNum}>2<div className={classes.textCards}>Copias la url de la web que quieres comentar</div>
                </ListItem>
              </List>

              <List className={classes.cards}>
                <ListItem><img className={classes.icons} src={url} alt="cut" /></ListItem>
                <ListItem className={classes.ListNum}>3<div className={classes.textCards}>Lo pegas en tu perfil y escribes lo que te apetezca.</div>
                </ListItem>
              </List>

              <List className={classes.cards}>
                <ListItem><img className={classes.icons} src={comment} alt="start"></img></ListItem>
                <ListItem className={classes.ListNum}>4<div className={classes.textCards}>¡Y listos!</div>
                  <Button className={classes.Button2}>CREAR CUENTA</Button>
                </ListItem>
              </List>
            </List>
          </div>

        </article>
        
        </Grid>
      </Grid>

    </section>
  );
};

export default Features;
