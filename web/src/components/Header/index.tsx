import React, { useCallback, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from '@material-ui/core';
import SignUpDialog from '../SignUpDialog';
import SignInDialog from '../SignInDialog';
import { useAuth } from '../../hooks/auth';
import { useAPI } from '../../hooks/apis';
import styles from './styles';

const Header: React.FC = () => {
  const classes = styles();
  const { user, signOut } = useAuth();
  const { apiList, updateApi, selectedAPI } = useAPI();
  const [openSignUpDialog, setOpenSignUpDialog] = useState(false);
  const [openSignInDialog, setOpenSignInDialog] = useState(false);

  const handleClickOpenSignUpDialog = useCallback(() => {
    setOpenSignUpDialog(true);
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    updateApi(event.target.value as string);
  };
  const handleCloseSignUpDialog = useCallback(() => {
    setOpenSignUpDialog(false);
  }, []);

  const handleClickOpenSignInDialog = useCallback(() => {
    setOpenSignInDialog(true);
  }, []);

  const handleCloseSignInDialog = useCallback(() => {
    setOpenSignInDialog(false);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Welcome{user && `, ${user.name}`}!
          </Typography>
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.label} color="secondary" shrink>
              Select the API
            </InputLabel>
            <Select
              value={selectedAPI}
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}
            >
              {apiList.map(api => (
                <MenuItem key={api.label} value={api.label}>
                  {api.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {user ? (
            <>
              <Link href="/favorites">
                <IconButton className={classes.button}>
                  <FavoriteIcon />
                </IconButton>
              </Link>
              <IconButton onClick={signOut} className={classes.button}>
                <PowerSettingsNewIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Button
                onClick={handleClickOpenSignInDialog}
                className={classes.button}
              >
                Login
              </Button>
              <Button
                className={classes.button}
                onClick={handleClickOpenSignUpDialog}
              >
                Sign up
              </Button>
              <SignUpDialog
                open={openSignUpDialog}
                handleClose={handleCloseSignUpDialog}
              />
              <SignInDialog
                open={openSignInDialog}
                handleClose={handleCloseSignInDialog}
              />
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
