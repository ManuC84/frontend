import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainSection: {
    display: "flex",
    alignItems: "center",
    height: "80vh",
    backgroundImage:
      "linear-gradient(to top, #64b5f6, #3c91e5, #226dd0, #2347b6, #311996);",
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
    width: "45%",
    height: 500,
    textAlign: "left",
    padding: "50px",
  },
  heroImgSection: {},
}));
