import React, { createContext, useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}
interface AuthState {
  token: string;
  user: User;
}
interface SignInCredentials {
  email: string;
  password: string;
}
interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}
interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  signUp(credentials: SignUpCredentials): Promise<void>;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GrowthHackers:token');
    const user = localStorage.getItem('@GrowthHackers:user');
    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });
    const { token, user } = response.data;
    localStorage.setItem('@GrowthHackers:token', token);
    localStorage.setItem('@GrowthHackers:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GrowthHackers:token');
    localStorage.removeItem('@GrowthHackers:user');
    setData({} as AuthState);
    history.push('/');
  }, [history]);

  const signUp = useCallback(
    async (credentials: SignUpCredentials) => {
      await api.post('/users', credentials);
      await signIn({
        email: credentials.email,
        password: credentials.password,
      });
    },
    [signIn],
  );

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
