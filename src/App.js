import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  IconButton,
} from "@mui/material";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import YearlyData from "./components/Dashboard/YearlyData";

import HomePage from "./components/HomePage"; // Main page with the table
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import { lightTheme, darkTheme } from "./components/Theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Spinner from "./Spinner";
import ThisMonth from "./components/Dashboard/ThisMonth";
import Last30Days from "./components/Dashboard/Last30Days";
import Last7Days from "./components/Dashboard/Last7Days";
import TodayData from "./components/Dashboard/TodayData";

const App = (props) => {
  const user =
    useSelector((state) => state.authReducer.isAuthenticated) ||
    localStorage.getItem("token");

  const [themeMode, setThemeMode] = useState("light"); // 'light' or 'dark'

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      {useSelector((state) => state.spinnerReducer.isLoading) && <Spinner />}
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="toggle theme"
        onClick={toggleTheme}
        sx={{ position: "fixed", top: 16, left: 16, zIndex: 1300 }}
      >
        {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Container>
        <Routes>
          <Route
            path="/job-application-tracker-frontend"
            element={
              user ? (
                <Layout toggleTheme={toggleTheme}>
                  <HomePage />{" "}
                </Layout>
              ) : (
                <Navigate to="/job-application-tracker-frontend/login" />
              )
            }
          />
          <Route
            path="/job-application-tracker-frontend/login"
            element={
              user ? (
                <Navigate to="/job-application-tracker-frontend" />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/job-application-tracker-frontend/signup"
            element={
              user ? (
                <Navigate to="/job-application-tracker-frontend" />
              ) : (
                <Signup />
              )
            }
          />
          <Route
            path="/job-application-tracker-frontend/dashboard"
            element={
              user ? (
                <Layout toggleTheme={toggleTheme}>
                  <Dashboard />{" "}
                </Layout>
              ) : (
                <Navigate to="/job-application-tracker-frontend/login" />
              )
            }
          />
          <Route
            path="/job-application-tracker-frontend/dashboard/*"
            element={
              user ? (
                <Layout toggleTheme={toggleTheme}>
                  <Routes>
                    <Route index element={<Navigate to="yearly" />} />
                    <Route
                      path="yearly"
                      element={<YearlyData view="yearly" />}
                    />
                    <Route
                      path="this-month"
                      element={<ThisMonth view="this-month" />}
                    />
                    <Route
                      path="last-30-days"
                      element={<Last30Days view="last-30-days" />}
                    />
                    <Route
                      path="last-7-days"
                      element={<Last7Days view="last-7-days" />}
                    />
                    <Route path="today" element={<TodayData view="today" />} />
                    <Route
                      path="this-week"
                      element={<Dashboard view="this-week" />}
                    />
                  </Routes>
                </Layout>
              ) : (
                <Navigate to="/job-application-tracker-frontend/login" />
              )
            }
          />
          <Route
            path="/job-application-tracker-frontend/dashboard/this-week"
            element={
              user ? (
                <Layout toggleTheme={toggleTheme}>
                  <Dashboard view="this-week" />
                </Layout>
              ) : (
                <Navigate to="/job-application-tracker-frontend/login" />
              )
            }
          />
          <Route
            path="*"
            element={<Navigate to="/job-application-tracker-frontend/login" />}
          />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;
