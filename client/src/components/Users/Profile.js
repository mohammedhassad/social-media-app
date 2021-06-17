import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { startCase, capitalize } from "lodash";
import { isAuthenticated } from "../Auth/auth-helpers";
import { getUser } from "./api-user";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    backgroundColor: "transparent",
  },
  listItemText: {
    marginLeft: theme.spacing(4),
  },
  primaryText: {
    ...theme.primaryText,
    fontSize: "1.5rem",

    "&:hover": {
      textDecoration: "none",
    },
  },
  secondaryText: {
    ...theme.secondaryText,
    fontSize: 16,
  },
  avatar: {
    width: 100,
    height: 100,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [following, setFollowing] = useState(false);

  const checkFollow = (user) => {
    const match = user.followers.some(
      (follower) => follower._id === isAuthenticated().user._id
    );

    return match;
  };

  useEffect(() => {
    document.title = "Social - Profile";
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getUser({ userId }, { jwt: isAuthenticated().token }, signal).then(
      (data) => {
        if (data) {
          if (data?.status === "success") {
            setFollowing(checkFollow(data.user));
            setUser(data.user);
            return;
          }

          navigate("/signin");
        }
      }
    );
  }, [userId, navigate]);

  const handleFollowButton = (cb) => {
    cb(
      { userId: isAuthenticated().user._id },
      { jwt: isAuthenticated().token },
      user._id
    ).then((data) => {
      if (data?.status === "success") {
        setFollowing(!following);
        setUser(data.user);
      }
    });
  };

  user.photo = `/api/users/photo/${user._id}`;

  return (
    <Paper className={classes.root} elevation={0}>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              src={user.photo}
              alt={startCase(user.name)}
              className={classes.avatar}
            />
          </ListItemAvatar>
          <ListItemText
            primary={startCase(user.name)}
            secondary={user.email}
            classes={{
              root: classes.listItemText,
              primary: classes.primaryText,
              secondary: classes.secondaryText,
            }}
          />
          {isAuthenticated().user &&
            (isAuthenticated().user._id === user._id ? (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + user._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            ) : (
              <FollowProfileButton
                following={following}
                handleClickButton={handleFollowButton}
              />
            ))}
        </ListItem>
        <Divider light={true} style={{ margin: "5px 0" }} />
        <ListItem>
          <ListItemText
            primary={capitalize(user.about)}
            secondary={"Joined: " + new Date(user.createdAt).toDateString()}
          />
        </ListItem>
      </List>

      <ProfileTabs user={user} />
    </Paper>
  );
};

export default Profile;
