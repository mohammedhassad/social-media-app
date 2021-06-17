import React, { useEffect, useState } from "react";
import {
  AppBar,
  TableContainer,
  Tabs,
  Tab,
  Box,
  makeStyles,
} from "@material-ui/core";
import FollowGrid from "./FollowGrid";
import { listByUser } from "../Post/api-post";
import { isAuthenticated } from "../Auth/auth-helpers";
import PostList from "../Post/PostList";
import { filter } from "lodash";
import CreatePost from "../Post/CreatePost";

const useStyles = makeStyles((theme) => ({
  box: {
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0),
    },
  },
}));

const ProfileTabs = ({ user }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [posts, setPosts] = useState([]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    listByUser({ userId: user._id }, { jwt: isAuthenticated().token }).then(
      (data) => {
        if (data?.status === "success") {
          setPosts(data.posts);
        }

        return;
      }
    );

    return function cleanUp() {
      setPosts([]);
    };
  }, [user]);

  const addPost = (post) => {
    const updatedPosts = [...posts];
    updatedPosts.unshift(post);
    setPosts(updatedPosts);
  };
  const removePost = (post) => {
    let updatedPosts = [...posts];
    updatedPosts = filter(
      updatedPosts,
      (updatePost) => updatePost._id !== post._id
    );
    setPosts(updatedPosts);
  };

  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Posts" disableFocusRipple />
          <Tab label="Following" disableFocusRipple />
          <Tab label="Followers" disableFocusRipple />
        </Tabs>
      </AppBar>

      {value === 0 && (
        <TableContainer>
          <Box px={7} py={3} className={classes.box}>
            {isAuthenticated().user._id === user._id && (
              <CreatePost addUpdate={addPost} />
            )}
            <PostList posts={posts} removeUpdate={removePost} />
          </Box>
        </TableContainer>
      )}
      {value === 1 && (
        <TableContainer>
          <FollowGrid users={user.following} />
        </TableContainer>
      )}
      {value === 2 && (
        <TableContainer>
          <FollowGrid users={user.followers} />
        </TableContainer>
      )}
    </div>
  );
};

export default ProfileTabs;
