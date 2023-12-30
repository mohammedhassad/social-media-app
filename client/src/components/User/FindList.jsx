import { isAuthenticated } from "@/components/Auth/auth-helpers";
import { StyledPrimaryText, StyledSecondaryText } from "@/styles";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { filter, startCase } from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { findUsers, follow } from "./api-user.js";

const UserFindList = () => {
  const theme = useTheme();
  const [values, setValues] = useState({
    users: [],
    open: false,
    followMessage: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    findUsers(
      { userId: isAuthenticated().user._id },
      { jwt: isAuthenticated().token },
      signal
    ).then((data) => {
      if (data?.status === "success") {
        setValues({ ...values, users: data?.users });
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [values]);

  const handleFollowUser = (user, index) => {
    follow(
      { userId: isAuthenticated().user._id },
      { jwt: isAuthenticated().token },
      user._id
    ).then((data) => {
      if (data?.status === "success") {
        let tofollow = filter(values.users, (value, key) => key !== index);
        setValues({
          ...values,
          users: tofollow,
          open: true,
          followMessage: `Following ${startCase(user.name)}`,
        });

        return;
      }
    });
  };

  const handleRequestClose = () => {
    setValues({ ...values, open: false });
  };

  return (
    <>
      <Stack spacing={3}>
        <Typography
          type="title"
          sx={{
            color: "#57607C",
            fontSize: "1rem",
            fontWeight: theme.typography.fontWeightMedium,
          }}
        >
          Who to follow
        </Typography>

        <List>
          {values?.users?.map((user, index) => {
            return (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Link to={"/user/" + user._id}>
                    <Avatar
                      src={user?._id && "/api/users/photo/" + user._id}
                      alt={startCase(user.name)}
                    />
                  </Link>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <StyledPrimaryText
                      component={Link}
                      to={"/user/" + user._id}
                    >
                      {startCase(user.name)}
                    </StyledPrimaryText>
                  }
                  secondary={
                    <StyledSecondaryText component="span">
                      Suggested for you
                    </StyledSecondaryText>
                  }
                />

                <ListItemSecondaryAction>
                  <Button
                    aria-label="Follow"
                    variant="text"
                    size="small"
                    onClick={() => {
                      handleFollowUser(user, index);
                    }}
                    sx={{
                      textTransform: "Capitalize",
                    }}
                  >
                    Follow
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Stack>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={values.open}
        onClose={handleRequestClose}
        autoHideDuration={6000}
        message={values.followMessage}
      />
    </>
  );
};

export default UserFindList;
