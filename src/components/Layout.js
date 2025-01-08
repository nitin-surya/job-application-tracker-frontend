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
import Collapse from "@mui/material/Collapse";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/AuthActions";
import { Drawer } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const drawerWidth = 200;

function ResponsiveDrawer(props) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openDashboard, setOpenDashboard] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.authReducer.user?.username);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/job-application-tracker-frontend/login");
  };

  const handleDashboardClick = () => {
    setOpenDashboard(!openDashboard);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {/* <ListItem key="Dashboard" disablePadding>
          <ListItemButton onClick={handleDashboardClick}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
            {openDashboard ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem> */}
        <Collapse in={openDashboard} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem key="Yearly" disablePadding>
              <ListItemButton
                onClick={() =>
                  navigate("/job-application-tracker-frontend/dashboard/yearly")
                }
              >
                <ListItemText primary="Yearly" sx={{ pl: 4 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="This Month" disablePadding>
              <ListItemButton
                onClick={() =>
                  navigate(
                    "/job-application-tracker-frontend/dashboard/this-month"
                  )
                }
              >
                <ListItemText primary="This Month" sx={{ pl: 4 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="Last 30 Days" disablePadding>
              <ListItemButton
                onClick={() =>
                  navigate(
                    "/job-application-tracker-frontend/dashboard/last-30-days"
                  )
                }
              >
                <ListItemText primary="Last 30 Days" sx={{ pl: 4 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="Last 7 Days" disablePadding>
              <ListItemButton
                onClick={() =>
                  navigate(
                    "/job-application-tracker-frontend/dashboard/last-7-days"
                  )
                }
              >
                <ListItemText primary="Last 7 Days" sx={{ pl: 4 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="Today" disablePadding>
              <ListItemButton
                onClick={() =>
                  navigate("/job-application-tracker-frontend/dashboard/today")
                }
              >
                <ListItemText primary="Today" sx={{ pl: 4 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="This Week" disablePadding>
              <ListItemButton
                onClick={() =>
                  navigate(
                    "/job-application-tracker-frontend/dashboard/this-week"
                  )
                }
              >
                <ListItemText primary="This Week" sx={{ pl: 4 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
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
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: "100px", marginLeft: "20px" },
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
};

export default ResponsiveDrawer;
