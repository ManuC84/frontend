import { makeStyles } from "@material-ui/core/styles";
// import Backgroud from "../../../img/comerciobackground.svg";
// import geolocalizacionBackground from "../../../img/geolocalizacionBackground.svg";
import backgroundSection from "../../../img/sectionBackground.svg";

export default makeStyles((theme) => ({

  mainSection: {
    display: "flex",
    background: "#2BC8D1",
    position: "relative",
    paddingBottom: "2px",
    // backgroundColor: "#F0F0F0",
    // backgroundColor: "#5E44BA",

  },

  article: {
    display: "flex",
    justifyContent: "center",
    margin: "50px",
    height: "auto",
  },


  Box1: {
    display: "inline-block",
    width: "40%",
    padding: 50,
    fontSize: "1rem",
    lineHeight: "30px",
    letterSpacing: "0.2em",

    // GLASS MORPHIN EFFECT
    background: "rgba(83, 171, 220, 0.05)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(5px)",
    borderRadius: "8px",
    // border: "1px solid rgba(255, 255, 255, 0.18)",


    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  Box2: {
    display: "inline-block",
    width: "40%",
    padding: 50,
    fontSize: "1rem",
    lineHeight: "30px",
    letterSpacing: "0.2em",

    // GLASS MORPHIN EFFECT
    background: "rgba(83, 171, 220, 0.05)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(5px)",
    borderRadius: "8px",


    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  Box3: {
    display: "inline-block",
    width: "100%",
    alignSelf: "center",
    padding: 50,
    fontSize: "1rem",
    lineHeight: "30px",
    letterSpacing: "0.2em",

    // GLASS MORPHIN EFFECT
    background: "rgba(83, 171, 220, 0.05)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(5px)",
    borderRadius: "8px",

    [theme.breakpoints.down("sm")]: {
      width: "100%",

    },
  },

  [theme.breakpoints.down("xs")]: {
    width: "100%",

  },


  Box4: {
    display: "flex",
    flexDirection: "column",
    with: "100%",
    padding: 50,
    marginBottom: 50,
    fontSize: "1rem",
    lineHeight: "30px",
    letterSpacing: "0.2em",

    // GLASS MORPHIN EFFECT
    background: "rgba(83, 171, 220, 0.05)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(5px)",
    borderRadius: "8px",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      width: "70%",

    },
  },

  Tittle1: {
    fontSize: "2rem",
    fontFamily: "MuseoModerno",
    color: "#ffff",
    fontWeight: 600,
    textAlign: "start",
    marginTop: "20px",
    // SHADOW BOX EFFECT
    padding: "6px",
    boxShadow: "6px -9px yellow",
    backgroundColor: "#5E44BA",
    "&:hover": {
      backgroundColor: "#B963F7",
      // color: "#B963F7",
      boxShadow: "6px -9px #5E44BA",
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      lineHeight: "30px",
    },
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      lineHeight: "33px",
    },
  },

  Tittle2: {
    fontSize: "2rem",
    fontFamily: "MuseoModerno",
    color: "#ffff",
    fontWeight: 600,
    textAlign: "start",
    marginTop: "50px",
    textAlign: "space-start",
    padding: "5px",
    backgroundColor: "#5E44BA",
    boxShadow: "6px -9px yellow",
    "&:hover": {
      backgroundColor: "#0DDDC9",
      color: "#5E44BA",
      boxShadow: "6px -9px #5E44BA",
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      lineHeight: "30px",
    },
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      lineHeight: "33px",
    },
  },

  ListNum: {
    display: "inline-block",
    textAlign: "start",
    fontFamily: "MuseoModerno",
    color: "#5E44BA",
    fontSize: "2.5rem",
    listStyle: "none",
    fontWeight: 600,
    margin: 30,
    paddingBottom:50,
  },

  ListText: {
    fontFamily: 'Montserrat',
    color: "#F0F0F0",
    marginTop: "15px",
    fontWeight: 600,
    letterSpacing: "0.4px",
    lineHeight: "40px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      lineHeight: "30px",
    },
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      lineHeight: "33px",
    },

  },

  ListText2: {
    fontFamily: 'Montserrat',
    color: "#F0F0F0",
    marginTop: "15px",
    paddingBottom: 15,
    fontSize: "1.2rem",
    textAlign: "left",
    fontWeight: 600,
    letterSpacing: "0.4px",
    lineHeight: "40px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      lineHeight: "30px",
    },
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      lineHeight: "33px",
    },
  },

  ColorButton: {
    width: 170,
    fontFamily: 'Montserrat',
    alignSelf: "start",
    borderRadius: "15px",
    fontSize: "1rem",
    fontWeight: 800,
    marginTop: 10,
    color: theme.palette.getContrastText("#7324A3"),
    backgroundColor: "#5E44BA",
    "&:hover": {
      backgroundColor: "#B963F7",
    },
    boxShadow: "6px 1px 21px -5px rgba(127,140,231,0.9)",
  },

  Button: {
    width: 170,
    
    fontFamily: 'Montserrat',
    borderRadius: "15px",
    fontSize: "1rem",
    fontWeight: 800,
    color: theme.palette.getContrastText("#7324A3"),
    backgroundColor: "#5E44BA",
    "&:hover": {
      backgroundColor: "#B963F7",
    },
    boxShadow: "6px 1px 21px -5px rgba(127,140,231,0.9)",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "center",
    },
  },



  img: {
    height: 400,
    alignSelf: "center",
    padding: 50,
    [theme.breakpoints.down("sm")]: {
      padding: 20,
      height: 300,
      width: 300,
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },


  sectionBackground: {
    backgroundImage: `url(${backgroundSection})`,
    backgroundSize: "cover",
    height: "90vh",
    backgroundColor: "#2BC8D1",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",

    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },


  geoBackground: {
    backgroundColor: "#B963F7",
    padding: 20,

  },

  // BOX: CÓMO FUNCIONA
  cards: {
    display: "inline-block",
    width: "20%",
    height: "40vh",
    margin: 15,
    padding: 20,

    // GLASS MORPHIN EFFECT
    background: "yellow",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    backdropFilter: "blur(20px)",
    borderRadius: "8px",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      width: "80%",
      height: "25vh",
      margin: 10,
      padding: 5,

    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      width: "100%",
      height:"20vh",
      marginTop: 5,
      padding: 3,
      

    },

  },


  textCards: {
    display: "flex",
    marginTop: "15px",
    fontFamily: 'Montserrat',
    color: "#5E44BA",
    fontSize: "1rem",
    textAlign: "start",
    fontWeight: 600,
    letterSpacing: "1px",
    lineHeight: "2.1rem",

    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      lineHeight: "30px",
      fontSize: "0.999rem",
      textAlign: "start",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.999rem",
      textAlign: "start",
      lineHeight: "33px",

    },

  },

  icons: {
    height: 130,
    with: 130,

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      height: "80",
      width: "80",
      padding: 10,
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
      // justifyContent:"center",
      // height: "3vh",
      // width: "3vh",
    
    },
  },

}));
