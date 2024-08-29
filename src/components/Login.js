import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../redux/actions/AuthActions";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const validate = () => {
    let tempErrors = {};
    tempErrors.username = userData.username ? "" : "Username is required.";
    tempErrors.password = userData.password ? "" : "Password is required.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      const result = await dispatch(loginUser(userData, navigate));
      if (result.success) {
        setSnackbar({
          open: true,
          message: result.message,
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: result.message,
          severity: "error",
        });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          borderRadius: 1,
          boxShadow: 3,
          backgroundColor: theme.palette.mode === "dark" ? "#333" : "white",
          mt: 8,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3 }}>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2, color: theme.palette.text.primary }}
        >
          Don't have an account?{" "}
          <Link
            to="/job-application-tracker-frontend/signup"
            style={{
              color: theme.palette.primary.main,
              textDecoration: "none",
            }}
          >
            Sign up here
          </Link>
        </Typography>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Login;
