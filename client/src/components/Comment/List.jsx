import { isAuthenticated } from "@/components/Auth/auth-helpers";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CommentList = ({ comments, deleteComment }) => {
  const theme = useTheme();

  return (
    <>
      {comments?.map((item, index) => (
        <Stack
          key={index}
          direction="row"
          alignItems="start"
          px={2}
          mb={2}
          spacing={2}
        >
          <Avatar
            src={item?.postedBy && `/api/users/photo/${item.postedBy._id}`}
            sx={{
              width: "25px",
              height: "25px",
            }}
          />

          <Box flex={1}>
            <Box bgcolor="#F3F6F9" px={2} py={1} borderRadius="5px">
              <Box
                as={Link}
                to={"/user/" + item.postedBy?._id}
                sx={{
                  fontSize: "0.82rem",
                  fontWeight: theme.typography.fontWeightMedium,
                  color: "#262626",
                  textDecoration: "none",
                  textTransform: "capitalize",
                }}
              >
                {item.postedBy?.name}
              </Box>

              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: 1.3333,
                  marginTop: theme.spacing(0.5),
                }}
              >
                {item.text}
              </Typography>
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              color="gray"
              fontSize="0.8em"
              my={theme.spacing(1)}
              spacing={1}
            >
              <Box as="span">{new Date(item.createdAt).toDateString()}</Box>
              {isAuthenticated()?.user?._id === item.postedBy?._id && (
                <>
                  <Box as="span">|</Box>

                  <IconButton
                    size="small"
                    onClick={(event) => deleteComment(event, item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </Stack>
          </Box>
        </Stack>
      ))}
    </>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default CommentList;
