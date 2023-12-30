import { CardContent, CardHeader, Typography, useTheme } from "@mui/material";
import { StyledCard } from "@/styles";
import UserFormEdit from "@/components/User/Form/Edit";
import { useEffect } from "react";

const ScreensUserEdit = () => {
  const theme = useTheme();

  useEffect(() => {
    document.title = "Edit Profile - Social Media App";
  }, []);

  return (
    <StyledCard
      maxwidth="600px"
      sx={{ mx: "auto", mt: theme.spacing(5), mb: theme.spacing(3) }}
    >
      <CardHeader
        title={
          <Typography
            variant="h6"
            sx={{
              color: "#57607C",
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            Edit Profile
          </Typography>
        }
      />

      <CardContent>
        <UserFormEdit />
      </CardContent>
    </StyledCard>
  );
};

export default ScreensUserEdit;
