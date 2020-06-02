import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { configureStore } from './stores';
import { AppRouter } from './screens/AppRouter';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-76723458-8');
ReactGA.pageview(window.location.pathname + window.location.search);
const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#b05700'
    },
    secondary: {
      main: '#fed010'
    }
  }
});

const App: React.SFC = () => {
  return (
    <Provider store={configureStore()}>
      <ThemeProvider theme={muiTheme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
