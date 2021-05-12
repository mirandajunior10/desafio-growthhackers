import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingBottom: 20,
    },
    card: {
      flex: '1 0 21%',
      marginRight: 100,
      marginTop: 20,
      maxWidth: 345,
    },
    description: {
      margin: '16px 8px',
      backgroundColor: theme.palette.secondary.main,
    },
    collapse: {
      padding: 16,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      maxHeight: 72,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.secondary,
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: 16,
    },
  }),
);
