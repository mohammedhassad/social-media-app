import { StyledCard } from "@/styles";
import { ArrowForward } from "@mui/icons-material";
import {
  Avatar,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { startCase } from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "@/components/User/api-user";

const ScreensUserList = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    document.title = "List Users - Social Media App";
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getUsers(signal).then((data) => {
      if (data?.status === "success") {
        setUsers(data.users);
      }

      return;
    });

    return function cleanUp() {
      abortController.abort();
    };
  }, []);

  const urlPhoto = `/api/users/photo/`;

  return (
    <StyledCard
      elevation={0}
      sx={{
        mx: "auto",
        mt: theme.spacing(5),
        mb: theme.spacing(3),
      }}
    >
      <CardHeader
        title={
          <Typography
            variant="h6"
            sx={{
              color: "#57607C",
              fontSize: "1.5rem",
              textTransform: "Capitalize",
            }}
          >
            all users
          </Typography>
        }
      />

      <CardContent>
        <List disablePadding>
          {users?.map((user, index) => (
            <ListItem
              component={Link}
              to={"/user/" + user._id}
              key={index}
              sx={{
                textDecoration: "none",
                color: theme.palette.common.black,
                textTransform: "capitalize",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={`${urlPhoto}${user._id}`}
                  alt={startCase(user.name)}
                />
              </ListItemAvatar>
              <ListItemText primary={startCase(user.name)} />
              <ListItemSecondaryAction>
                <IconButton component={Link} to={"/user/" + user._id}>
                  <ArrowForward />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </StyledCard>
  );
};

export default ScreensUserList;
