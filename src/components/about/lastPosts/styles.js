import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainSection: {
    backgroundColor: "#5E44BA",
    display: "flex",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  boxSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "50%",
    marginTop: 100,
    [theme.breakpoints.down("xs")]: {
      marginBottom: 20,
      width: "100%",
    },
  },

  Title: {
    fontFamily: "MuseoModerno",
    fontSize: "2.5rem",
    textAlign: "center",
    fontWeight: 900,
    letterSpacing: "10px",
    color: "#0DDDC9",
    padding:20,
    
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.3rem",
      textAlign: "center",
      
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.2rem",
      textAlign: "center",
      letterSpacing: "5px",
    },
  },

  Subtitol: {
    fontFamily: 'Montserrat',
    fontSize: "1.6rem",
    textAlign: "center",
    fontWeight: 600,
    lineHeight: "40px",
    wordSpacing:4,
    color: "#f8f9fa",
    listStyle: "none",
    paddingLeft:20,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
      textAlign: "center",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
      textAlign: "center",
    },
  },

  ColorButton: {
    width: 170,
    borderRadius: "50px",
    fontSize: "1rem",
    fontWeight: 800,
    marginTop: 20,
    color: theme.palette.getContrastText("#7324A3"),
    backgroundColor: "#0DDDC9",
    "&:hover": {
      backgroundColor: "#7F8CE7",
    },
  },
  sliderContainer: {
    width: "50%",
    padding: 20,
    margin: "20px 20px",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
  },
}));
