import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography, Box, InputBase, Button } from "@material-ui/core";
import { isAuthenticated } from "../Auth/auth-helpers";
import { comment, uncomment } from "./api-post";

const initialValues = {
  text: "",
};

const validationSchema = Yup.object().shape({
  text: Yup.string().required(),
});

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  smallAvatar: {
    width: 25,
    height: 25,
  },
  commentField: {
    width: "96%",
  },
  commentText: {
    fontSize: "0.875rem",
    lineHeight: 1.3333,
    marginTop: theme.spacing(0.5),
  },
  commentDate: {
    display: "block",
    color: "gray",
    fontSize: "0.8em",
    margin: theme.spacing(0.5, 0, 0, 0.5),
  },
  commentDelete: {
    fontSize: "1.6em",
    verticalAlign: "middle",
    cursor: "pointer",
  },
  nameProfile: {
    fontSize: "0.82rem",
    fontWeight: theme.typography.fontWeightMedium,
    color: "#262626",
    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
    },
  },
  inputBase: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    outline: "none",
    fontSize: 14,
    backgroundColor: "inherit",
    color: "#57607C",
    borderRadius: 10,
    border: "1px solid #eee",
    fontFamily: theme.typography.fontFamily,
  },
  postButton: {
    textTransform: "Capitalize",
    fontSize: 13,

    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

const Comments = ({ postId, comments, updateComments }) => {
  const classes = useStyles();

  const addComment = (values, errors) => {
    comment({ jwt: isAuthenticated().token }, postId, {
      text: values.text,
    }).then((data) => {
      if (data?.status === "success") {
        errors.resetForm();
        updateComments(data.post.comments);
        return;
      }

      data.errors && errors.setErrors(data.errors);
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
    <div>
      <Box display="flex" alignItems="start" px={2} my={2}>
        <Avatar
          className={classes.smallAvatar}
          src={
            "/api/users/photo/" +
            isAuthenticated().user._id
          }
        />
        <Box ml={2} flex={1} borderRadius={10}>
          <Formik
            initialValues={initialValues}
            onSubmit={addComment}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              dirty,
            }) => (
              <Form>
                <Box display="flex" alignItems="center">
                  <InputBase
                    id="text"
                    name="text"
                    placeholder="Add a comment..."
                    fullWidth
                    multiline
                    rows={3}
                    onChange={handleChange}
                    value={values.text}
                    className={classes.inputBase}
                  />
                  <Button
                    type="submit"
                    variant="text"
                    size="small"
                    color="primary"
                    className={classes.postButton}
                    disabled={!dirty}
                  >
                    Post
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
      {comments.map((item, index) => {
        return (
          <Box key={index} display="flex" alignItems="start" px={2} mb={2}>
            <Avatar
              className={classes.smallAvatar}
              src={
                "/api/users/photo/" + item.postedBy?._id
              }
            />
            <Box ml={2} flex={1}>
              <Box bgcolor="#eee" px={2} py={1} borderRadius={10}>
                <Link
                  to={"/user/" + item.postedBy?._id}
                  className={classes.nameProfile}
                >
                  {item.postedBy?.name}
                </Link>
                <Typography
                  variant="body1"
                  component="p"
                  className={classes.commentText}
                >
                  {item.text}
                </Typography>
              </Box>
              <span className={classes.commentDate}>
                {new Date(item.createdAt).toDateString()} |
                {isAuthenticated().user._id === item.postedBy?._id && (
                  <Icon
                    onClick={(event) => deleteComment(event, item)}
                    className={classes.commentDelete}
                  >
                    delete
                  </Icon>
                )}
              </span>
            </Box>
          </Box>
        );
      })}
    </div>
  );
};

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  updateComments: PropTypes.func.isRequired,
};

export default Comments;
