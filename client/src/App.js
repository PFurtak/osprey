import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { theme, ThemeProvider, CSSReset } from '@chakra-ui/core';
import Header from './components/layout/Header';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

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
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
