import { StyledCard } from "@/styles";
import { CardContent, CardHeader, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const AuthBase = ({ title, children }) => {
  const theme = useTheme();

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
              textAlign: "center",
            }}
          >
            {title}
          </Typography>
        }
      />

      <CardContent>{children}</CardContent>
    </StyledCard>
  );
};

AuthBase.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthBase;
