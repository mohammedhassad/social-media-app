import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import PostFormCreate from "./Form/Create";
import PostList from "./List";
import { listNewsFeed } from "./api-post";
import { isAuthenticated } from "@/components/Auth/auth-helpers";
import { filter } from "lodash";
import { Stack, useTheme } from "@mui/material";

const PostNewsFeed = () => {
  const theme = useTheme();
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
    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
  };

  const removePost = (post) => {
    let updatedPosts = filter(
      posts,
      (updatePost) => updatePost._id !== post._id
    );
    setPosts(updatedPosts);
  };

  return (
    <Stack spacing={3}>
      <Typography
        type="title"
        sx={{
          color: "#57607C",
          fontSize: "1rem",
          fontWeight: theme.typography.fontWeightMedium,
        }}
      >
        Newsfeed
      </Typography>

      <PostFormCreate addUpdate={addPost} />

      <PostList removeUpdate={removePost} posts={posts} />
    </Stack>
  );
};

export default PostNewsFeed;
