import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  commentReply: {
    marginLeft: 80,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 25,
    },
  },
  '@keyframes fadeout': {
    '0%, 100%': {
      background: 'inherit',
    },
    '50%': {
      background: 'cyan',
    },
  },
  notificationFadeOut: {
    // backgroundColor: 'cyan',
    animation: '$fadeout 1.5s 3 linear',
  },
}));
