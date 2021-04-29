import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainSection: {
    backgroundColor: "#5E44BA",
  },

  box: {
    display: "flex",
    padding: "40px",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },

  boxSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "70%",
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
    // paddingBottom: "25px",
    listStyle: "none",
  },

  ColorButton: {
    width: 170,
    alignSelf: "flex-start",
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
