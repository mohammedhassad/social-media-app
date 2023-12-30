import { isAuthenticated } from "@/components/Auth/auth-helpers";
import { comment, uncomment } from "@/components/Post/api-post";
import { Avatar, Box } from "@mui/material";
import PropTypes from "prop-types";
import CommentFormCreate from "./Form/Create";
import CommentList from "./List";
import { Stack } from "@mui/material";

const Comment = ({ postId, comments, updateComments }) => {
  const addComment = (values, { resetForm, setErrors, setSubmitting }) => {
    comment({ jwt: isAuthenticated().token }, postId, {
      text: values.text,
    }).then((data) => {
      if (data?.status === "success") {
        resetForm();
        updateComments(data.post.comments);
        return;
      }

      data.errors && setErrors(data.errors);
      setSubmitting(false);
    });
  };

  const deleteComment = (event, comment) => {
    uncomment(
      {
        jwt: isAuthenticated().token,
      },
      postId,
      comment
    ).then((data) => {
      if (data?.status === "success") {
        updateComments(data.post.comments);
      }
    });
  };

  return (
    <Box>
      <Stack direction="row" alignItems="start" px={2} my={2} spacing={2}>
        <Avatar
          src={"/api/users/photo/" + isAuthenticated().user._id}
          sx={{
            width: "25px",
            height: "25px",
          }}
        />
        <Box flex={1} borderRadius="10px">
          <CommentFormCreate addComment={addComment} />
        </Box>
      </Stack>

      <CommentList comments={comments} deleteComment={deleteComment} />
    </Box>
  );
};

Comment.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  updateComments: PropTypes.func.isRequired,
};

export default Comment;
