import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import background from "../../../img/backgroundWave.svg";

export default makeStyles((theme) => ({
  mainSection: {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
   height:"130vh",
    background: "#2BC8D1",
    [theme.breakpoints.down("sm")]: {
      height: "100vh",
    },
    [theme.breakpoints.down("xs")]: {
      height: "120vh",
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
      paddingBottom: 30,
    },
  },

  heroImg: {
    height: 600,
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  TitleSection: {
    fontFamily: "MuseoModerno",
    fontSize: "2.5rem",
    fontWeight: 900,
    letterSpacing: "5px",
    color: "#0DDDC9",
    paddingBottom: "15px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.3rem",
      textAlign: "left",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.2rem",
      textAlign: "center",
    },
  },

  Subtitol: {
    // width:"40%",
    fontFamily: 'Montserrat',
    fontSize: "1.4rem",
    textAlign: "left",
    fontWeight: 600,
    lineHeight: "40px",
    wordSpacing: 2,
    color: "#f8f9fa",
    paddingBottom: "30px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
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
