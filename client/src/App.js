import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { theme, ThemeProvider, CSSReset } from '@chakra-ui/core';
import AuthState from './context/auth/authState';
import DocState from './context/doc/DocState';
import setAuthToken from '../src/utils/setAuthToken';
import Header from './components/layout/Header';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import About from './components/pages/About';
import DocPage from './components/pages/DocPage';
import Home from './components/pages/Home';
import Issues from './components/pages/Issues';
import PrivateRoute from './components/routing/PrivateRoute';

const breakpoints = ['160px', '768px', '1024px', '1440px'];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const newTheme = {
  ...theme,
  breakpoints,
};

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <DocState>
        <ThemeProvider theme={newTheme}>
          <CSSReset />
          <Router>
            <Header />
            <Switch>
              <PrivateRoute exact path='/docs' component={DocPage} />
              <PrivateRoute exact path='/issues' component={Issues} />
              <Route exact path='/' component={Home} />
              <Route exact path='/signin' component={SignIn} />
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/about' component={About} />
            </Switch>
          </Router>
        </ThemeProvider>
      </DocState>
    </AuthState>
  );
}

export default App;
