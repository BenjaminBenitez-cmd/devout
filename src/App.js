import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthProvider, { AuthContext } from "./context/AuthContext";
// import LayoutAdmin from "./layouts/LayoutAdmin";
import Admin from "./sections/Admin";
import Store from "./sections/Store";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/" component={Store} />
          </Switch>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
