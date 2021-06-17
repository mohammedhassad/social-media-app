import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { startCase, some } from "lodash";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import CommentIcon from "@material-ui/icons/Comment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  Divider,
  Button,
  Grid,
  Box,
  Collapse,
} from "@material-ui/core";
import { isAuthenticated } from "../Auth/auth-helpers";
import { deletePost, like, unlike } from "./api-post";
import Comments from "./Comments";

const useStyles = makeStyles((theme) => ({
  card: {
    ...theme.card,
    textAlign: "start",
    maxWidth: 600,
  },
  cardContent: {
    padding: `${theme.spacing(2)}px 0px}`,
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(2),
  },
  media: {
    minHeight: 300,
    width: "100%",
    objectFit: "contain",
  },
  button: {
    textTransform: "capitalize",
    width: "100%",
  },
  primaryText: {
    ...theme.primaryText,

    "& a": {
      color: "inherit",
      textDecoration: "inherit",
    },
  },
  secondaryText: {
    ...theme.secondaryText,
  },
}));

const Post = ({ post, handleRemove }) => {
  const classes = useStyles();
  const [showComments, setShowComments] = useState(false);

  const checkLike = (likes) => {
    const match = some(likes, ["_id", isAuthenticated().user._id]);
    return match;
  };

  const [values, setValues] = useState({
    like: checkLike(post.likes),
    likes: post.likes?.length,
    comments: post.comments,
  });

  const handleDeletePost = (event) => {
    deletePost({ postId: post._id }, { jwt: isAuthenticated().token }).then(
      (data) => {
        if (data?.status === "success") {
          handleRemove(data.post);
        }
      }
    );
  };

  const handleClickLike = (event) => {
    let cb = values.like ? unlike : like;

    cb({ jwt: isAuthenticated().token }, post._id).then((data) => {
      if (data?.status === "success") {
        setValues({
          ...values,
          like: !values.like,
          likes: data.post.likes.length,
        });
      }
    });
  };

  const handleUpdateComments = (comments) => {
    setValues({ ...values, comments: comments });
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Link to={"/user/" + post.postedBy._id}>
            <Avatar
              src={"/api/users/photo/" + post.postedBy._id}
              alt={startCase(post.postedBy.name)}
            />
          </Link>
        }
        action={
          post.postedBy._id === isAuthenticated().user._id && (
            <IconButton onClick={handleDeletePost}>
              <DeleteIcon />
            </IconButton>
          )
        }
        title={
          <Link to={"/user/" + post.postedBy._id}>
            {startCase(post.postedBy.name)}
          </Link>
        }
        subheader={new Date(post.createdAt).toDateString()}
        classes={{
          title: classes.primaryText,
          subheader: classes.secondaryText,
        }}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.text}>
          {post.text}
        </Typography>
        {post.photo && (
          <img
            className={classes.media}
            src={`/api/posts/photo/${post._id}`}
            alt="post"
          />
        )}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={3}
          py={1}
        >
          <Box display="flex" alignItems="center">
            <ThumbUpAltIcon
              color="primary"
              fontSize="small"
              style={{ marginRight: 5 }}
            />{" "}
            {values.likes}
          </Box>
          <Box>{values.comments.length} Comments</Box>
        </Box>
      </CardContent>
      <Divider variant="middle" light={true} />
      <CardActions>
        <Grid container spacing={2} style={{ padding: "0 5px" }}>
          <Grid item xs={6}>
            {values.like ? (
              <Button
                size="small"
                onClick={handleClickLike}
                className={classes.button}
                color="primary"
                startIcon={<ThumbUpAltIcon />}
                aria-label="Like"
              >
                like
              </Button>
            ) : (
              <Button
                size="small"
                onClick={handleClickLike}
                className={classes.button}
                aria-label="Unlike"
                startIcon={<ThumbUpAltOutlinedIcon />}
              >
                like
              </Button>
            )}
          </Grid>
          <Grid item xs={6}>
            <Button
              size="small"
              className={classes.button}
              aria-label="Comment"
              startIcon={<CommentIcon />}
              onClick={() => setShowComments(!showComments)}
            >
              comment
            </Button>
          </Grid>
        </Grid>
      </CardActions>
      <Collapse in={showComments}>
        <Divider variant="middle" light={true} />
        <Comments
          postId={post._id}
          comments={values.comments}
          updateComments={handleUpdateComments}
        />
      </Collapse>
    </Card>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default Post;
