import React from "react";
import "./App.css";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";

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
