import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import Layout from "./layout/Layout";
import Home from "./pages/Home";

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
