import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import LayoutAdmin from "./layouts/LayoutAdmin";
import Admin from "./sections/Admin";
import Store from "./sections/Store";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Store} />
      </Switch>
    </Router>
  );
};

export default App;
