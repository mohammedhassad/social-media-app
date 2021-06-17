import { createMuiTheme } from "@material-ui/core/styles";
import { orange, blue } from "@material-ui/core/colors";
import { IconButton, Collapse, InputBase, withStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";

const defaultTheme = createMuiTheme();

export default createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange,
    type: "light",
  },
  typography: {
    fontFamily: ["Nunito", "Helvetica", "Arial", "sans-serif"].join(","),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  alert: {
    marginTop: 3,
    fontSize: 12,
  },
  card: {
    maxWidth: 500,
    borderRadius: 8,
    boxShadow: "0  .5rem 1rem rgba(0,0,0, .15)",
    textAlign: "center",
    margin: "auto",
    marginTop: defaultTheme.spacing(5),
    marginBottom: defaultTheme.spacing(3),
  },
  cardTitle: {
    marginTop: defaultTheme.spacing(2),
    marginBottom: defaultTheme.spacing(4),
    color: "#57607C",
    fontSize: "1.5rem",
  },
  labelInput: {
    "&, & > span": {
      color: "#57607C !important",
    },
  },
  buttonSubmit: {
    height: 40,
    borderRadius: 5,
  },

  primaryText: {
    fontSize: "0.8rem",
    fontWeight: 600,

    color: "#262626",
    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
    },
  },
  secondaryText: {
    color: "#8e8e8e",
    fontSize: 12,
  },
});

const Alert = (props) => {
  return (
    <Collapse in={props.open}>
      <MuiAlert
        variant="filled"
        {...props}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={props.onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      />
    </Collapse>
  );
};

const Input = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },

    "&.Mui-error > input": {
      borderColor: theme.palette.error.main,
    },
  },

  input: {
    height: (props) => props.height || 25,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    outline: "none",
    fontSize: 15,
    backgroundColor: theme.palette.common.white,
    color: "#57607C",
    borderRadius: 5,
    border: "1px solid #ced4da",
    transition: theme.transitions.create(["border-color"]),
    position: "relative",

    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

export { Alert, Input };
