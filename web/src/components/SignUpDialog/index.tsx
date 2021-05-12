import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';

interface SignUpDialogProps {
  open: boolean;
  handleClose: () => void;
}

const SignUpDialog: React.FC<SignUpDialogProps> = ({ open, handleClose }) => {
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isNameErrored, setNameErrored] = useState(false);
  const [isEmailErrored, setEmailErrored] = useState(false);
  const [isPasswordErrored, setPasswordErrored] = useState(false);

  const handleSubmit = useCallback(async () => {
    setNameErrored(false);
    setEmailErrored(false);
    setPasswordErrored(false);
    try {
      const data = { name, email, password };
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });
      await schema.validate(data, { abortEarly: false });
      await signUp(data);
      handleClose();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(err => {
          switch (err.path) {
            case 'name':
              setNameErrored(true);
              break;
            case 'email':
              setEmailErrored(true);
              break;
            case 'password':
              setPasswordErrored(true);
              break;

            default:
              break;
          }
        });
      }
    }
  }, [email, handleClose, name, password, signUp]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
        <DialogContent>
          <TextField
            error={isNameErrored}
            autoFocus
            margin="dense"
            label="Name"
            type="name"
            fullWidth
            variant="outlined"
            onChange={e => setName(e.target.value)}
          />
          <TextField
            error={isEmailErrored}
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            error={isPasswordErrored}
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            onChange={e => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Sign up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default SignUpDialog;
