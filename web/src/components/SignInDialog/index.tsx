import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';

interface SignInDialogProps {
  open: boolean;
  handleClose: () => void;
}

const SignInDialog: React.FC<SignInDialogProps> = ({ open, handleClose }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isEmailErrored, setEmailErrored] = useState(false);
  const [isPasswordErrored, setPasswordErrored] = useState(false);

  const handleSubmit = useCallback(async () => {
    setEmailErrored(false);
    setPasswordErrored(false);
    try {
      const data = { email, password };
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });
      await schema.validate(data, { abortEarly: false });
      await signIn(data);
      handleClose();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(err => {
          switch (err.path) {
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
  }, [email, handleClose, password, signIn]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign up</DialogTitle>
        <DialogContent>
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
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Log in
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default SignInDialog;
