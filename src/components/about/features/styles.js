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
    height: 300,
    padding: "50px",
  },

  textSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "50%",
  },
}));
