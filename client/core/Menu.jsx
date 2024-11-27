import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import auth from "../lib/auth-helper";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TeamLogo from "../assets/images/team-logo.jpg";
import "../src/index.css";

const isActive = (location, path) => {
  return location.pathname === path
    ? { color: "#ff4081" }
    : { color: "#ffffff" };
};
export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static">
      <div class="logo">
        <img src={TeamLogo}></img>
        <Toolbar className = "toolBarColor">
          <Typography variant="h6" color="inherit">
            Concert Compass
          </Typography>
          <Link to="/">
            <Button style={isActive(location, "/")}>Home</Button>
          </Link>
          <Link to="/about-us">
            <Button style={isActive(location, "/about-us")}>About Us</Button>
          </Link>
          <Link to="/addconcerts">
            <Button style={isActive(location, "/addconcerts")}>
              Add Concerts
            </Button>
          </Link>
          {!auth.isAuthenticated() && (
            <span>
              <Link to="/signup">
                <Button style={isActive(location, "/signup")}>Register</Button>
              </Link>
              <Link to="/signin">
                <Button style={isActive(location, "/signin")}>Sign In</Button>
              </Link>
            </span>
          )}
          {auth.isAuthenticated() && (
            <span>
              <Link to={"/user/" + auth.isAuthenticated().user._id}>
                <Button
                  style={isActive(
                    location,
                    "/user/" + auth.isAuthenticated().user._id
                  )}
                >
                  My Profile
                </Button>
              </Link>
              <Button
                color="inherit"
                onClick={() => {
                  auth.clearJWT(() => navigate("/"));
                }}
              >
                Sign out
              </Button>
            </span>
          )}
        </Toolbar>
      </div>
    </AppBar>
  );
}
