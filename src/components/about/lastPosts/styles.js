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
    fontWeight: 900,
    letterSpacing: "1px",
    color: "#0DDDC9",
    // paddingBottom: "20px",
    listStyle: "none",
  },

  Subtitol: {
    fontSize: "1.5rem",
    textAlign: "center",
    fontWeight: 500,
    lineHeight: "40px",
    wordSpacing: 2,
    color: "#f8f9fa",
    marginTop: 20,
    // paddingBottom: "25px",
    listStyle: "none",
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
