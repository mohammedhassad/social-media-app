import { createTheme } from "@mui/material";
import { blue, orange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: orange,
    background: {
      default: "#fafafa",
    },
  },

  typography: {
    fontFamily: ["Nunito", "Helvetica", "Arial", "sans-serif"].join(","),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

export default theme;

// palette: {
//   primary: blue,
//   secondary: orange,
// },

//   alert: {
//     marginTop: 3,
//     fontSize: 12,
//   },
//   card: {
//     maxWidth: 500,
//     borderRadius: 8,
//     boxShadow: "0  .5rem 1rem rgba(0,0,0, .15)",
//     textAlign: "center",
//     margin: "auto",
//     marginTop: theme.spacing(5),
//     marginBottom: theme.spacing(3),
//   },
//   cardTitle: {
//     marginTop: theme.spacing(2),
//     marginBottom: theme.spacing(4),
//     color: "#57607C",
//     fontSize: "1.5rem",
//   },
//   labelInput: {
//     "&, & > span": {
//       color: "#57607C !important",
//     },
//   },
//   buttonSubmit: {
//     height: 40,
//     borderRadius: 5,
//   },

//   primaryText: {
//     fontSize: "0.8rem",
//     fontWeight: 600,

//     color: "#262626",
//     textDecoration: "none",

//     "&:hover": {
//       textDecoration: "underline",
//     },
//   },
//   secondaryText: {
//     color: "#8e8e8e",
//     fontSize: 12,
//   },
