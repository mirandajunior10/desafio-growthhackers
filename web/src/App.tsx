import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';
import Routes from './routes';
import Header from './components/Header';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4dd0e1',
      dark: '#009faf',
      light: '#88ffff',
    },
    secondary: {
      main: '#9ccc65',
      dark: '#6b9b37',
      light: '#cfff95',
    },
    text: {
      primary: '#000',
      secondary: '#000',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppProvider>
          <Header />

          <Routes />
        </AppProvider>

        <GlobalStyle />
      </Router>
    </ThemeProvider>
  );
};

export default App;
