import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Message from "./screens/Message";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "./styles";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import { authService } from "./fbase";

function App() {
  useEffect(() => {
    authService
      .signInAnonymously()
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }, []);
  return (
    <HelmetProvider>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path="/" exact>
              <Layout>
                <Home />
              </Layout>
            </Route>

            <Route path={`/card/:id`}>
              <Layout>
                <Message />
              </Layout>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
