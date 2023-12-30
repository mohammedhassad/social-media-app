import {
  Avatar,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { startCase } from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserFollowGrid = ({ users }) => {
  const theme = useTheme();

  return (
    <ImageList rowHeight={160} cols={4} gap={3}>
      {users?.map((user, index) => (
        <ImageListItem
          key={index}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Link to={`/user/${user._id}`} style={{ textDecoration: "none" }}>
            <Stack alignItems="center" spacing={1}>
              <Avatar
                src={user?._id && `/api/users/photo/${user._id}`}
                alt={startCase(user.name)}
                sx={{
                  width: "60px",
                  height: "60px",
                }}
              />

              <Typography
                component="span"
                sx={{
                  fontSize: "0.875rem",
                  color: "#262626",
                  fontWeight: theme.typography.fontWeightMedium,

                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {startCase(user.name)}
              </Typography>
            </Stack>
          </Link>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

UserFollowGrid.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserFollowGrid;
