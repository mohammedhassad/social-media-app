import React from "react";
import PropTypes from "prop-types";
import Post from ".";

const PostList = ({ removeUpdate, posts }) => {
  return (
    <div style={{ marginTop: "24px" }}>
      {posts?.map((item, index) => {
        return <Post post={item} key={index} handleRemove={removeUpdate} />;
      })}
    </div>
  );
};

PostList.propTypes = {
  removeUpdate: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};

export default PostList;
