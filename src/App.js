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
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage"; // Main page with the table
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import { lightTheme, darkTheme } from "./components/Theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const App = () => {
  const user =
    useSelector((state) => state.authReducer.isAuthenticated) ||
    localStorage.getItem("token");

  const [themeMode, setThemeMode] = useState("light"); // 'light' or 'dark'

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <IconButton
        color="inherit"
        aria-label="toggle theme"
        onClick={toggleTheme}
      >
        {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Container>
        <Routes>
          <Route
            path="/home"
            element={
              user ? (
                <Layout toggleTheme={toggleTheme}>
                  <HomePage />{" "}
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/home" /> : <Signup />}
          />
          <Route
            path="/dashboard"
            element={
              user ? (
                <Layout toggleTheme={toggleTheme}>
                  <Dashboard />{" "}
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;
