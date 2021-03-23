import { FormHelperText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  postsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    margin: "20px 0",
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
  infiniteProgress: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
  infiniteComponent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  tagError: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  },
}));
