import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearJWT, isAuthenticated } from "./Auth/auth-helpers";

const StyledNavItem = styled(Box)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const StyledNavLink = styled(Box)(({ theme }) => ({
  textTransform: "Capitalize",
  textDecoration: "none",
  color: "inherit",
  opacity: 0.8,
  fontSize: "0.875rem",
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightRequilar,
  padding: theme.spacing(1, 1.5),

  "&.active": {
    opacity: 1,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            "& > a": {
              textDecoration: "none",
              color: "currentcolor",
            },
          }}
        >
          <Link to="/">Social Media</Link>
        </Typography>

        <Stack
          component="ul"
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            listStyle: "none",
          }}
        >
          {isAuthenticated() ? (
            <>
              <StyledNavItem as="li">
                <StyledNavLink as={NavLink} to="/" end>
                  home
                </StyledNavLink>
              </StyledNavItem>

              {/* <StyledNavItem as="li">
                <StyledNavLink as={NavLink} to="/users" end>
                  Users
                </StyledNavLink>
              </StyledNavItem> */}

              <StyledNavItem as="li">
                <StyledNavLink
                  as={NavLink}
                  to={`/user/${isAuthenticated().user._id}`}
                  end
                >
                  My Profile
                </StyledNavLink>
              </StyledNavItem>

              <StyledNavItem as="li">
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    clearJWT(() => navigate("/"));
                  }}
                  sx={{
                    color: "#fff",
                    padding: theme.spacing(1, 1.5),
                    borderRadius: "5px",
                  }}
                >
                  Sign out
                </Button>
              </StyledNavItem>
            </>
          ) : (
            <>
              <StyledNavItem as="li">
                <StyledNavLink as={NavLink} to="/signup" end>
                  Sign up
                </StyledNavLink>
              </StyledNavItem>

              <StyledNavItem as="li">
                <StyledNavLink as={NavLink} to="/signin" end>
                  Sign in
                </StyledNavLink>
              </StyledNavItem>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
