import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0 auto',
      flexGrow: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      color: theme.palette.text.primary,
      marginTop: theme.spacing(2),
    },
    label: {
      color: theme.palette.text.primary,
    },
    menuButton: {
      color: theme.palette.text.primary,
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    button: {
      color: theme.palette.secondary.light,
    },
  }),
);
