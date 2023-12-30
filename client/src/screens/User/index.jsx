import { isAuthenticated } from "@/components/Auth/auth-helpers";
import UserDelete from "@/components/User/Delete";
import UserForllowButton from "@/components/User/FollowButton";
import UserTabs from "@/components/User/Tabs";
import { getUser } from "@/components/User/api-user";
import { StyledPrimaryText, StyledSecondaryText } from "@/styles";
import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  useTheme,
} from "@mui/material";
import { capitalize, startCase } from "lodash";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ScreensUser = () => {
  const theme = useTheme();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [following, setFollowing] = useState(false);

  const checkFollow = (user) => {
    const match = user.followers.some(
      (follower) => follower?._id === isAuthenticated()?.user?._id
    );

    return match;
  };

  useEffect(() => {
    document.title = "Profile - Social Media App";
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getUser({ userId }, { jwt: isAuthenticated().token }, signal).then(
      (data) => {
        if (data) {
          if (data?.status === "success") {
            setFollowing(checkFollow(data?.user));

            setUser(data.user);
            return;
          }

          navigate("/signin");
        }
      }
    );
  }, [userId, navigate]);

  const handleFollowButton = (cb) => {
    cb(
      { userId: isAuthenticated()?.user?._id },
      { jwt: isAuthenticated()?.token },
      user?._id
    ).then((data) => {
      if (data?.status === "success") {
        setFollowing(!following);
        setUser(data.user);
      }
    });
  };

  return (
    <Box
      sx={{
        maxWidth: "900px",
        mx: "auto",
        mt: theme.spacing(5),
        p: theme.spacing(3),
      }}
    >
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              src={user?._id && `/api/users/photo/${user._id}`}
              alt={startCase(user?.name)}
              sx={{
                width: "100px",
                height: "100px",
              }}
            />
          </ListItemAvatar>

          <ListItemText
            primary={
              <StyledPrimaryText
                component="span"
                sx={{
                  fontSize: "1.5rem",

                  "&:hover": {
                    textDecoration: "none",
                  },
                }}
              >
                {startCase(user?.name)}
              </StyledPrimaryText>
            }
            secondary={
              <StyledSecondaryText component="span" sx={{ fontSize: "1rem" }}>
                {user?.email}
              </StyledSecondaryText>
            }
            sx={{
              ml: theme.spacing(4),
            }}
          />
          {isAuthenticated()?.user &&
            (isAuthenticated()?.user?._id === user?._id ? (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + user?._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <UserDelete userId={user?._id} />
              </ListItemSecondaryAction>
            ) : (
              <UserForllowButton
                following={following}
                handleClickButton={handleFollowButton}
              />
            ))}
        </ListItem>

        <Divider light={true} sx={{ my: "10px" }} />

        <ListItem>
          <ListItemText
            primary={capitalize(user.about)}
            secondary={"Joined: " + new Date(user.createdAt).toDateString()}
          />
        </ListItem>
      </List>

      <UserTabs user={user} />
    </Box>
  );
};

export default ScreensUser;
