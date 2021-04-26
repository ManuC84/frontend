import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainSection: {
    display: "flex",
    alignItems: "center",
    height: "80vh",
    backgroundImage: "linear-gradient(to top, #64b5f6, #3c91e5, #226dd0, #2347b6, #311996);",
  },

  heroContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  
  heroTextSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "60%",
    height: 600,
    textAlign: "start",
    padding: "50px",
    
  },

  heroTitle: {
    // fontFamily: "MuseoModerno"
    fontSize: "3.21rem",
    fontWeight: 500,
    letterSpacing: "2px",
    color: "#f8f9fa",
   
  },
}));
