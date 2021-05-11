import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import background from "../../../img/backgroundWave.svg";

export default makeStyles((theme) => ({

  mainSection: {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    background: "#F2F2FF",
    // background: "#2BC8D1",
    [theme.breakpoints.down("sm")]: {
      height: "80vh",
    },
    [theme.breakpoints.down("xs")]: {
      height: "90vh",
      backgroundSize: "cover",
    },
  },

  heroContainer: {
    padding: 20,

  },

  heroTextSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 20,
    },
  },

  heroImg: {
    height: 550,
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  TitleSection: {
    fontFamily: "MuseoModerno",
    fontSize: "3rem",
    fontWeight: 900,
    letterSpacing: "0.5px",
    color: "#0DDDC9",
    
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.9rem",
      textAlign: "center",
      paddingBottom:"3vh",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "2rem",
      paddingBottom: "1vh",
      textAlign: "center",
    },
  },

  Subtitol: {
    fontFamily: 'Montserrat',
    fontSize: "1.7rem",
    textAlign: "left",
    fontWeight: 500,
    lineHeight: "40px",
    wordSpacing: 2,
    color: "#f8f9fa",
    paddingBottom: "20px",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      textAlign: "center",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.3rem",
      textAlign: "center",
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
    backgroundColor: "#0DDDC9",
    "&:hover": {
      backgroundColor: "#B963F7",
    },
    boxShadow: "6px 1px 21px -5px rgba(127,140,231,0.9)",
    [theme.breakpoints.down("sm")]: {
      alignSelf: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignSelf: "center",
    },
  },
}));
