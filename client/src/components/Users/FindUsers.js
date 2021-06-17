import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { findUsers, follow } from "./api-user.js";
import { isAuthenticated } from "../Auth/auth-helpers";
import { startCase, filter } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(5),
    backgroundColor: "transparent",
  },
  title: {
    color: "#57607C",
    fontSize: 13.4,
    fontWeight: theme.typography.fontWeightMedium,
    textTransform: "capitalize",
    marginLeft: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(1),
    width: 35,
    height: 35,
  },
  follow: {
    right: theme.spacing(2),
  },
  primaryText: {
    fontSize: "0.8rem",
    fontWeight: theme.typography.fontWeightMedium,

    "& a": {
      color: "#262626",
      textDecoration: "none",

      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  secondaryText: {
    color: "#8e8e8e",
    fontSize: 12,
  },
  buttonFollow: {
    textTransform: "Capitalize",
    fontSize: 13,
    fontWeight: theme.typography.fontWeightMedium,
    fontFamily: theme.typography.fontFamily,

    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

const FindUsers = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    users: [],
    open: false,
    followMessage: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    findUsers(
      { userId: isAuthenticated().user._id },
      { jwt: isAuthenticated().token },
      signal
    ).then((data) => {
      if (data?.status === "success") {
        setValues({ ...values, users: data?.users });
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [values]);

  const handleFollowUser = (user, index) => {
    follow(
      { userId: isAuthenticated().user._id },
      { jwt: isAuthenticated().token },
      user._id
    ).then((data) => {
      if (data?.status === "success") {
        let tofollow = filter(values.users, (value, key) => key !== index);
        setValues({
          ...values,
          users: tofollow,
          open: true,
          followMessage: `Following ${startCase(user.name)}`,
        });

        return;
      }
    });
  };

  const handleRequestClose = () => {
    setValues({ ...values, open: false });
  };

  return (
    <div>
      <Box px={7} mt={5}>
        <Typography type="title" className={classes.title}>
          Who to follow
        </Typography>
        <List>
          {values?.users?.map((user, index) => {
            return (
              <span key={index}>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                    <Link to={"/user/" + user._id}>
                      <Avatar
                        src={"/api/users/photo/" + user._id}
                        alt={startCase(user.name)}
                        className={classes.avatar}
                      />
                    </Link>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Link to={"/user/" + user._id}>
                        {startCase(user.name)}
                      </Link>
                    }
                    classes={{
                      primary: classes.primaryText,
                      secondary: classes.secondaryText,
                    }}
                    secondary="Suggested for you"
                  />
                  <ListItemSecondaryAction className={classes.follow}>
                    <Button
                      aria-label="Follow"
                      variant="text"
                      color="primary"
                      onClick={() => {
                        handleFollowUser(user, index);
                      }}
                      className={classes.buttonFollow}
                    >
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </span>
            );
          })}
        </List>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={values.open}
        onClose={handleRequestClose}
        autoHideDuration={6000}
        message={<span className={classes.snack}>{values.followMessage}</span>}
      />
    </div>
  );
};

export default FindUsers;
