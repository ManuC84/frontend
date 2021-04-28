import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import background from "../../../img/backgroundHero.png";


export default makeStyles((theme) => ({


  mainSection: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: "#ffff",

  },

  heroContainer: {
  display: "flex",
  justifyContent: "space-around",
 
  //   // [theme.breakpoints.down("xs", "sm")]: {
  //   //   display: "flex",
  //   //   flexDirection: "column",
  //   // },
  },

  heroImgSection: {
    maxHeight:"75vh",
    maxWidth: "75vh",
    justifyContent: "flex-end",
    
    [theme.breakpoints.down("xs")]: {
      maxHeight: "auto",
      maxWidth: "auto",
      
    },

  },

  heroTextSection: {
    display: "flex",
    flexDirection:"column",
    width:"50%", 
  

  },


  Title: {
    fontFamily: 'MuseoModerno',
    fontSize: "2.5rem",
    fontWeight: 900,
    letterSpacing: "5px",
    color: "#0DDDC9",
    paddingBottom:"20px",
    [theme.breakpoints.down("xs", "sm")]: {
      fontSize: "1rem",

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
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.4rem",
      lineHeight: "15px",
      wordSpacing: 1,
      

    },
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
  


}));
