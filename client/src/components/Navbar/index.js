import React from "react";
import clsx from "clsx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { isAuthenticated, clearJWT } from "../Auth/auth-helpers";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    "& > a": {
      textDecoration: "none",
      color: "currentcolor",
    },
  },
  tabItem: {
    minWidth: 90,
    textTransform: "Capitalize",
  },
  navItems: {
    display: "flex",
    alignItems: "center",
    listStyle: "none",
  },
  navItem: {
    color: theme.palette.common.white,
    minWidth: 90,
  },
  navLink: {
    textTransform: "Capitalize",
    textDecoration: "none",
    color: "inherit",
    opacity: 0.8,
    fontSize: "0.875rem",
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightRequilar,

    "&.active": {
      opacity: 1,
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  button: {
    textTransform: "uppercase",
    color: "#fff",
    padding: theme.spacing(1, 1.5),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to="/">MERN Social</Link>
        </Typography>

        <ul className={classes.navItems}>
          {isAuthenticated() ? (
            <>
              <li className={classes.navItem}>
                <NavLink to="/" className={classes.navLink} end>
                  home
                </NavLink>
              </li>
              {/* <li className={classes.navItem}>
                <NavLink to="/users" className={classes.navLink} end>
                  Users
                </NavLink>
              </li> */}
              <li className={classes.navItem}>
                <NavLink
                  to={`/user/${isAuthenticated().user._id}`}
                  className={classes.navLink}
                  end
                >
                  My Profile
                </NavLink>
              </li>
              <li className={classes.navItem}>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  className={clsx(classes.button)}
                  onClick={() => {
                    clearJWT(() => navigate("/"));
                  }}
                >
                  Sign out
                </Button>
              </li>
            </>
          ) : (
            <>
              <li className={classes.navItem}>
                <NavLink to="/signup" className={classes.navLink} end>
                  Sign up
                </NavLink>
              </li>
              <li className={classes.navItem}>
                <NavLink to="/signin" className={classes.navLink} end>
                  Sign in
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
