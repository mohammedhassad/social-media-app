import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowForward } from "@material-ui/icons";
import { startCase } from "lodash";
import { Link } from "react-router-dom";
import { getUsers } from "./api-user";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    textTransform: "Capitalize",
  },
  listItem: {
    textDecoration: "none",
    color: theme.palette.common.black,
  },
}));

const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getUsers(signal).then((data) => {
      if (data?.status === "success") {
        setUsers(data.users);
      }

      return;
    });

    return function cleanUp() {
      abortController.abort();
    };
  }, []);

  const urlPhoto = `/api/users/photo/`;

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        all users
      </Typography>

      <List>
        {users?.map((user, index) => (
          <ListItem
            component={Link}
            to={"/user/" + user._id}
            key={index}
            className={classes.listItem}
          >
            <ListItemAvatar>
              <Avatar
                src={`${urlPhoto}${user._id}`}
                alt={startCase(user.name)}
              />
            </ListItemAvatar>
            <ListItemText primary={startCase(user.name)} />
            <ListItemSecondaryAction>
              <IconButton component={Link} to={"/user/" + user._id}>
                <ArrowForward />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Users;
