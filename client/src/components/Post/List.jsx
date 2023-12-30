import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import Post from ".";

const PostList = ({ removeUpdate, posts, align }) => {
  return (
    <Stack width="100%" spacing={3}>
      {posts?.map((item) => {
        return (
          <Stack alignItems={align ? align : "start"} key={item._id}>
            <Post post={item} key={item._id} handleRemove={removeUpdate} />
          </Stack>
        );
      })}
    </Stack>
  );
};

PostList.propTypes = {
  removeUpdate: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  align: PropTypes.string,
};

export default PostList;
