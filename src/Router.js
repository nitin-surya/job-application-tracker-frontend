import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import EnhancedTable from "./EnhancedTable";
import Layout from "./Layout";

const AppRouter = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/job-application-tracker-frontend/login" exact>
            {isAuthenticated ? (
              <Redirect to="/job-application-tracker-frontend" />
            ) : (
              <Login />
            )}
          </Route>
          <Route path="/job-application-tracker-frontend/signup" exact>
            {isAuthenticated ? (
              <Redirect to="/job-application-tracker-frontend" />
            ) : (
              <Signup />
            )}
          </Route>
          <Route path="/job-application-tracker-frontend" exact>
            {isAuthenticated ? (
              <Layout>
                <EnhancedTable />
              </Layout>
            ) : (
              <Redirect to="/job-application-tracker-frontend/login" />
            )}
          </Route>
          <Route path="/job-application-tracker-frontend/dashboard" exact>
            {isAuthenticated ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Redirect to="/job-application-tracker-frontend/login" />
            )}
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default AppRouter;
