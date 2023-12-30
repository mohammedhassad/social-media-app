import { Card, InputBase, InputLabel, Typography, styled } from "@mui/material";

export const StyledCard = styled(Card)(({ maxwidth }) => ({
  maxWidth: maxwidth ? maxwidth : "500px",
  width: "100%",
  borderRadius: "8px",
  boxShadow: "0px 0px 0px 1px rgb(140 140 140/.2)",
  // margin: "auto",
  // marginTop: theme.spacing(5),
  // marginBottom: theme.spacing(3),
}));

export const StyledInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },

  "& .MuiInputBase-input": {
    padding: "10px 12px",
    fontSize: "1rem",
    color: "#57607C",
    borderRadius: "5px",
    border: "1px solid",
    borderColor: "#ced4da",
    position: "relative",
    backgroundColor: "#F3F6F9",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),

    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const StyledInputLabel = styled(InputLabel)({
  "&, & > span": {
    color: "#57607C !important",
  },
});

export const StyledPrimaryText = styled(Typography)(() => ({
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "#262626",
  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
  },
}));

export const StyledSecondaryText = styled(Typography)(() => ({
  color: "#8e8e8e",
  fontSize: 12,
}));
