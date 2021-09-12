import React from "react";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/currencies" component={Home} />
        <Route exact path="/">
          <Redirect to="/currencies" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
