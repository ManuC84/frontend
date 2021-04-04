import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const CustomButton = ({ customProps }) => {
  const {
    text,
    primary = "#00AAA5",
    hover = "#4AD295",
    border,
    muiColor,
  } = customProps;
  const useStyles = makeStyles((theme) => ({
    button: {
      color: theme.palette.getContrastText(primary),
      backgroundColor: primary,
      "&:hover": {
        backgroundColor: hover,
      },
      borderRadius: border,
    },
  }));
  const classes = useStyles();
  return muiColor ? (
    <Button variant="contained" color={muiColor}>
      {text}
    </Button>
  ) : (
    <Button variant="contained" className={classes.button}>
      {text}
    </Button>
  );
};

export default CustomButton;
