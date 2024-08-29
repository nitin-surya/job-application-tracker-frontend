import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/job-application-tracker-frontend";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/AuthActions";
import { Drawer } from "@mui/material";

const drawerWidth = 200;

function ResponsiveDrawer(props) {
  const { window, children, toggleTheme } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.authReducer.user?.username);
  const themeMode = useSelector((state) => state.themeReducer.mode);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem key="Dashboard" disablePadding>
          <ListItemButton onClick={() => navigate("/dashboard")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Home Page" disablePadding>
          <ListItemButton
            onClick={() => navigate("/job-application-tracker-frontend")}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home Page" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Logout" disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          transition: "margin 0.3s ease",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Application Tracker
          </Typography>
          {username && (
            <Typography variant="body1" sx={{ ml: 2 }}>
              {username.toUpperCase()}
            </Typography>
          )}
          <IconButton
            color="inherit"
            aria-label="toggle theme"
            onClick={toggleTheme}
          >
            {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: 120 },
          // Removed the flex-shrink properties
          "-ms-flex-negative": 0,
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default ResponsiveDrawer;
