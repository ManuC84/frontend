import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import background from "../../../img/backgroundHero.png";

export default makeStyles((theme) => ({
  mainSection: {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#ffff",
    height: "100vh",
  },

  heroContainer: {
    padding: 20,
  },

  heroTextSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  heroImg: {
    height: 500,
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
    paddingBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },

  Subtitol: {
    // width:"40%",
    fontSize: "1.3rem",
    textAlign: "justify",
    fontWeight: 500,
    lineHeight: "40px",
    wordSpacing: 2,
    color: "#f8f9fa",
    paddingBottom: "30px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },

  ColorButton: {
    width: 170,
    alignSelf: "center",
    borderRadius: "50px",
    fontSize: "1rem",
    fontWeight: 800,
    color: theme.palette.getContrastText("#7324A3"),
    backgroundColor: "#0DDDC9",
    "&:hover": {
      backgroundColor: "#7F8CE7",
    },
  },
}));
