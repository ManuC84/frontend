import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  postsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: '20px 0',
  },
  progress: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
      marginTop: 100,
    },
  },
  infiniteProgress: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
  },
  infiniteComponent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  errorMessage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh',
  },
}));
