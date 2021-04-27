import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import background from "../../../img/backgroundHero.png";


export default makeStyles((theme) => ({

  mainSection: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: "#ffff",
    // backgroundImage: "linear-gradient(to top, #64b5f6, #3c91e5, #226dd0, #2347b6, #311996);",

  },

  heroImgSection: {
    maxWidth:"200%",
    maxHeight:"200%",
    alignItems: "start",
  },

  heroContainer: {
    display: "flex",
    width: "60%",
    alignItems: "start",
    height: "90vh",
    margingTop:"50vh",
    
  },

  heroTextSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "start",

  },


  TitleSection: {
    fontFamily: 'MuseoModerno',
    fontSize: "2.5rem",
    fontWeight: 900,
    letterSpacing: "5px",
    color: "#0DDDC9",
    paddingBottom:"20px",
  },

  Subtitol: {
    fontSize: "1.3rem",
    textAlign: "justify",
    fontWeight: 500,
    lineHeight: "40px",
    wordSpacing: 2,
    color: "#f8f9fa",
    paddingBottom: "30px",
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
