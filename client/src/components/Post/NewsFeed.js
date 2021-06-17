import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import CreatePost from "./CreatePost";
import PostList from "./PostList";
import { listNewsFeed } from "./api-post";
import { isAuthenticated } from "../Auth/auth-helpers";
import { filter } from "lodash";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#57607C",
    fontSize: "1rem",
    fontWeight: theme.typography.fontWeightMedium,
  },
  box: {
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0),
    },
  },
}));

const NewsFeed = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listNewsFeed(
      {
        jwt: isAuthenticated().token,
      },
      signal
    ).then((data) => {
      if (data?.status === "success") {
        setPosts(data.posts);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [navigate]);

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
    <Box px={7} className={classes.box}>
      <Typography type="title" className={classes.title}>
        Newsfeed
      </Typography>

      <CreatePost addUpdate={addPost} />

      <PostList removeUpdate={removePost} posts={posts} />
    </Box>
  );
};

export default NewsFeed;
