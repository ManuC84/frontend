import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  
  mainSection: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },

  featuresContainer: {},
  
  article: {
    display: "flex",
    justifyContent: "space-between",
    height: 450,
    margin: "25px",
    paddingBottom:"25px",
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


  },

  TittleSection: {
    fontSize: "2.3rem",
    fontWeight: 600,
    fontFamily: 'MuseoModerno',
    color: "#5E44BA",
    marginBottom: "20px",
    backgroundColor: "#0DDDC9",
    "&:hover": {
      backgroundColor: "#7F8CE7",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    
    
  },

  ListNum: {
    display: "flex",
    marginTop:"15px",
    width: "4.5rem",
    fontFamily: 'MuseoModerno',
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
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },

  heroImgSection:{
    width:"30%",
    height:"30%",

  },

}));
