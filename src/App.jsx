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
        <Route exact path="/" component={Home} />
      </Switch>
    </Layout>
  );
}

export default App;
