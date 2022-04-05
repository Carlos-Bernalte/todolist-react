import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./users/SignIn";
import SignUp from "./users/SignUp";
import Home from "./Home";

function App() {
  return (<Router>

    <Switch>
      <Route exact path='/' component={Login} />
      <Route path="/sign-in" component={Login} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/home" component={Home} />
    </Switch>

  </Router>
  );
}
export default App;