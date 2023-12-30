import { isAuthenticated } from "@/components/Auth/auth-helpers";
import PostFormCreate from "@/components/Post/Form/Create";
import PostList from "@/components/Post/List";
import { listByUser } from "@/components/Post/api-post";
import { AppBar, Box, Stack, Tab, TableContainer, Tabs } from "@mui/material";
import { filter } from "lodash";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import UserFollowGrid from "./FollowGrid";

// const useStyles = makeStyles((theme) => ({
//   box: {
//     [theme.breakpoints.down("md")]: {
//       padding: theme.spacing(0),
//     },
//   },
// }));

const UserTabs = ({ user }) => {
  const [value, setValue] = useState(0);
  const [posts, setPosts] = useState([]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (user?._id) {
      listByUser({ userId: user._id }, { jwt: isAuthenticated().token }).then(
        (data) => {
          if (data?.status === "success") {
            setPosts(data.posts);
          }

          return;
        }
      );
    }

    return function cleanUp() {
      setPosts([]);
    };
  }, [user]);

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
    <Box>
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
          <Stack alignItems="center" my={4} spacing={3}>
            {isAuthenticated()?.user?._id === user?._id && (
              <PostFormCreate addUpdate={addPost} />
            )}

            <PostList posts={posts} removeUpdate={removePost} align="center" />
          </Stack>
        </TableContainer>
      )}
      {value === 1 && (
        <TableContainer>
          <UserFollowGrid users={user?.following} />
        </TableContainer>
      )}
      {value === 2 && (
        <TableContainer>
          <UserFollowGrid users={user?.followers} />
        </TableContainer>
      )}
    </Box>
  );
};

UserTabs.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserTabs;
