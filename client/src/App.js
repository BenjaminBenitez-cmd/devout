import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Admin from "./pages/admin/Root";
import Store from "./pages/store/Root";

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
