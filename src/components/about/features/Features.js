import React from "react";
import makeStyles from "./styles";
import classNames from "classnames";
import { Button, List, ListItem, Card, Grid } from "@material-ui/core";
// ILLUSTRATION
import imgPlugin from "../../../img/imgPlugin.png";
import imgComercio from "../../../img/imgComercio.png";
import imgGeolocalizacion from "../../../img/imgGeolocalizacion.png";
// ICONS
import login from "../../../img/login.svg";
import copy from "../../../img/2.svg";
import url from "../../../img/3.svg";

const Features = () => {
  const classes = makeStyles();

  return (
    <section className={classes.mainSection}>
      <Grid
        container
        lg={12}
        sm={12}
        xs={12}
        style={{ display: "flex", justifyContent: "center" }}
      >
        {/* COMERCIO LOCAL */}
        <article className={classNames(classes.article)}>
          <img src={imgComercio} alt="comercio" className={classes.img} />
          <div className={classes.Box1}>
            <div className={classes.Tittle1}>Comercio local</div>
            <div className={classes.ListText2}>
              <div>
                Interactúa con los comercios de tu barrio a través de tu móvil
                de forma sencilla, escanea el codigo QR y entra directo a
                comentar con la comunidad.
              </div>
            </div>
            <div className={classes.Tittle1}>¿Eres comerciante?</div>
            <div className={classes.ListText2}>
              Aquí tendrás tu espacio para darte a conocer y publicitarte.
            </div>
            <Button className={classes.ColorButton}>¿TE ANIMAS? </Button>
          </div>
        </article>

        {/* GEOLOCALIZACIÓN */}
        <div className={classes.sectionBackground}>
          <article className={classNames(classes.article)}>
            <div className={classes.Box2}>
              <div className={classes.Tittle2}>Encuentra lo que necesitas</div>
              <div className={classes.ListText2}>
                <div>
                  <span>
                    Gracias a la <b>geolocalización</b> podrás encontrar aquel
                    comercio que necesitas estés dónde estés e interactuar para
                    saber qué opinan los demás.
                  </span>{" "}
                </div>
              </div>
              <Button className={classes.ColorButton}>BUSCAR </Button>
            </div>
            <img
              src={imgGeolocalizacion}
              alt="geolocalizacion"
              className={classes.img}
            />
          </article>
        </div>

        {/* DESCÁRGATE EL PLUGIN */}
        <article className={classNames(classes.article)}>
          <img src={imgPlugin} alt="plugin" className={classes.img} />
          <div className={classes.Box3}>
            <div className={classes.Tittle1}>Descárgate el plugin</div>
            <div className={classes.ListText2}>
              <div>Házlo aún más fácil con el plugin para Chrome.</div>
              <div>Podrás añadir la url y los comentarios en un click.</div>
            </div>
            <Button className={classes.ColorButton}>DESCARGAR</Button>{" "}
          </div>
        </article>

        {/* CÓMO FUNCIONA */}

        <article className={classNames(classes.article)}>
          <div className={classes.Box4}>
            {/* TITTLE */}
            <div className={classes.Tittle3}>¿Cómo funciona?</div>

            {/* CARDS */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className={classes.cards}>
                <div>
                  <img className={classes.icons} src={login} alt="login" />
                </div>
                <div className={classes.ListNum}>
                  1
                  <div className={classes.textCards}>
                    {" "}
                    Creas tu cuenta en Freely Comment
                  </div>
                </div>
              </div>

              <div className={classes.cards}>
                <div>
                  <img className={classes.icons} src={copy} alt="copy" />
                </div>
                <div className={classes.ListNum}>
                  2
                  <div className={classes.textCards}>
                    Copias la url de la web que quieres comentar
                  </div>
                </div>
              </div>

              <div className={classes.cards}>
                <div>
                  <img className={classes.icons} src={url} alt="cut" />
                </div>
                <div className={classes.ListNum}>
                  3
                  <div className={classes.textCards}>
                    Lo pegas en tu perfil y escribes lo que te apetezca.
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button className={classes.Button}>¡EMPIEZA YA!</Button>
            </div>
          </div>
        </article>
      </Grid>
    </section>
  );
};

export default Features;
