import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ScreensNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Page Not Found - Social Media App";
  }, []);

  return (
    <Stack justifyContent="center" alignItems="center" mt={15}>
      <Box height="200px" width="400px">
        <Typography variant="h1" component="h1">
          404
        </Typography>

        <Typography component="p" variant="h4">
          Page not found
        </Typography>

        <Stack mt={4} direction="row" alignItems="center" spacing={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              navigate("/");
              e.preventDefault();
            }}
            sx={{
              borderRadius: "5px",
              padding: "10px 12px",
            }}
          >
            Go to Home Page
          </Button>

          <Button
            color="primary"
            onClick={(e) => {
              navigate(-1);
              e.preventDefault();
            }}
            sx={{
              borderRadius: "5px",
              padding: "10px 12px",
            }}
          >
            Go Back
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ScreensNotFound;
