import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainSection: {
    display: "flex",
    // flexDirection: "column",
    backgroundColor: "white",
    position: "relative",
  },

  featuresContainer: {},

  article: {
    display: "flex",
    justifyContent: "space-between",

    margin: "25px",
    paddingBottom: "25px",
  },

  textBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "50%",
    fontSize: "1rem",
    listStyle: "none",
    fontWeight: 500,
    color: "grey",
    fontFamily: "Roboto",
    lineHeight: "30px",
    letterSpacing: "0.00938em",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  TittleSection: {
    fontSize: "2.3rem",
    fontWeight: 600,
    fontFamily: "MuseoModerno",
    color: "#5E44BA",
    marginBottom: "20px",
    padding: "1px",
    boxShadow: "6px -9px #7F8CE7",
    backgroundColor: "#0DDDC9",
    "&:hover": {
      backgroundColor: "#7F8CE7",
      color: "#0DDDC9",
      boxShadow: "6px -9px #0DDDC9",
    },
  },

  ListNum: {
    display: "flex",
    marginTop: "15px",
    width: "4.5rem",
    fontFamily: "MuseoModerno",
    color: "#5E44BA",
    fontSize: "3rem",
    listStyle: "none",
    fontWeight: 500,
  },

  ListText: {
    color: "#5E44BA",
    marginTop: "15px",
    fontSize: "1.2rem",
    textAlign: "justify",
    fontWeight: 400,
    letterSpacing: "1.2px",
    lineHeight: "30px",
    wordSpacing: 2,
    padding: 5,
  },

  ColorButton: {
    width: 170,
    alignSelf: "center",
    borderRadius: "50px",
    fontSize: "1rem",
    fontWeight: 800,
    marginTop: 10,
    color: theme.palette.getContrastText("#7324A3"),
    backgroundColor: "#0DDDC9",
    "&:hover": {
      backgroundColor: "#7F8CE7",
    },

    boxShadow: "6px 1px 21px -5px rgba(127,140,231,0.84)",
  },

  img: {
    height: 400,
    [theme.breakpoints.down("sm")]: {
      height: 300,
      width: 300,
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));
