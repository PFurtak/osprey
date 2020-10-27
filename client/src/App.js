import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { theme, ThemeProvider, CSSReset } from '@chakra-ui/core';
import Header from './components/layout/Header';
import Login from './components/auth/Login';

const breakpoints = ['160px', '768px', '1024px', '1440px'];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const newTheme = {
  ...theme,
  breakpoints,
};

function App() {
  return (
    <ThemeProvider theme={newTheme}>
      <CSSReset />
      <Router>
        <Header />
        <Switch>
          <Route exact path='/login' component={Login} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
