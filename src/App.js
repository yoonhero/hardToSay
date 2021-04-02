import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Message from "./screens/Message";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme } from "./styles";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import { authService } from "./fbase";

function App() {
  authService.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
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
