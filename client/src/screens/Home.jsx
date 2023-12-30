import { useEffect } from "react";
import { Container, Box, Grid } from "@mui/material";
import PostNewsFeed from "@/components/Post/NewsFeed";
import UserFindList from "@/components/User/FindList";

const ScreensHome = () => {
  useEffect(() => {
    document.title = "Home - Social Media App";
  }, []);

  return (
    <Box my={5}>
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={8}>
            <PostNewsFeed />
          </Grid>

          <Grid item xs={12} sm={4}>
            <UserFindList />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ScreensHome;
