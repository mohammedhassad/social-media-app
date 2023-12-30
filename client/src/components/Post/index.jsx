import { isAuthenticated } from "@/components/Auth/auth-helpers.js";
import Comment from "@/components/Comment";
import { StyledCard } from "@/styles";
import { StyledPrimaryText, StyledSecondaryText } from "@/styles.js";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { some, startCase } from "lodash";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deletePost, like, unlike } from "./api-post.js";

const Post = ({ post, handleRemove }) => {
  const theme = useTheme();
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

  const handleDeletePost = () => {
    deletePost({ postId: post._id }, { jwt: isAuthenticated().token }).then(
      (data) => {
        if (data?.status === "success") {
          handleRemove(data.post);
        }
      }
    );
  };

  const handleClickLike = () => {
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
    <StyledCard maxwidth="600px">
      <CardHeader
        avatar={
          <Link to={"/user/" + post?.postedBy?._id}>
            <Avatar
              src={post?.postedBy && `/api/users/photo/${post.postedBy._id}`}
              alt={startCase(post?.postedBy?.name)}
            />
          </Link>
        }
        action={
          post?.postedBy?._id === isAuthenticated()?.user?._id && (
            <IconButton onClick={handleDeletePost}>
              <DeleteIcon />
            </IconButton>
          )
        }
        title={
          <StyledPrimaryText as={Link} to={"/user/" + post?.postedBy?._id}>
            {startCase(post?.postedBy?.name)}
          </StyledPrimaryText>
        }
        subheader={
          <StyledSecondaryText>
            {new Date(post?.createdAt).toDateString()}
          </StyledSecondaryText>
        }
      />

      <CardContent
        sx={{
          px: 0,
        }}
      >
        <Stack spacing={2}>
          <Typography
            component="p"
            sx={{
              px: theme.spacing(2),
            }}
          >
            {post?.text}
          </Typography>

          {post?.photo && (
            <Box
              as="img"
              src={`/api/posts/photo/${post?._id}`}
              alt="post"
              sx={{
                minHeight: "300px",
                width: "100%",
                objectFit: "contain",
              }}
            />
          )}

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            px={2}
          >
            <Stack direction="row" alignItems="center">
              <ThumbUpAltIcon
                color="primary"
                fontSize="small"
                style={{ marginRight: 5 }}
              />
              {` ${values?.likes}`}
            </Stack>
            <Box>{values?.comments?.length} Comments</Box>
          </Stack>
        </Stack>
      </CardContent>

      <Divider variant="middle" light={true} />

      <CardActions>
        <Grid container spacing={2} px="5px">
          <Grid item xs={6}>
            <Button
              fullWidth
              size="small"
              onClick={handleClickLike}
              color={values?.like ? "primary" : "inherit"}
              startIcon={
                values?.like ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />
              }
              aria-label={values?.like ? "Like" : "Unlike"}
              sx={{ textTransform: "capitalize" }}
            >
              like
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              fullWidth
              size="small"
              aria-label="Comment"
              color="inherit"
              startIcon={<CommentIcon />}
              onClick={() => setShowComments(!showComments)}
              sx={{ textTransform: "capitalize" }}
            >
              comment
            </Button>
          </Grid>
        </Grid>
      </CardActions>

      <Collapse in={showComments}>
        <Divider variant="middle" light={true} />

        <Comment
          postId={post._id}
          comments={values.comments}
          updateComments={handleUpdateComments}
        />
      </Collapse>
    </StyledCard>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default Post;
