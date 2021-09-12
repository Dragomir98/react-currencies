import React from "react";
import { Redirect, Route, Router, Switch } from "react-router";
import "./App.css";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Layout>
      <Router basename="/react-currencies">
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
