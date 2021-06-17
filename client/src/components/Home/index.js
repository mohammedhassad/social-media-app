import React, { useEffect } from "react";
import { Container, Grid, Box } from "@material-ui/core";
import FindUsers from "../Users/FindUsers";
import NewsFeed from "../Post/NewsFeed";

const Home = () => {
  useEffect(() => {
    document.title = "Social - NewsFeed";
  }, []);

  return (
    <Box mt={5}>
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={8}>
            <NewsFeed />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FindUsers />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
