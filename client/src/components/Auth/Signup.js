import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography,
  FormControl,
  InputLabel,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Alert, Input } from "../../theme";
import { signup } from "./api-auth";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "passwords must match")
    .required("please confirm your password"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const useStyles = makeStyles((theme) => ({
  card: {
    ...theme.card,
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
  title: {
    ...theme.cardTitle,
  },
  margin: {
    marginBottom: theme.spacing(2),
  },
  label: {
    ...theme.labelInput,
  },
  button: {
    ...theme.buttonSubmit,
  },
  alert: {
    ...theme.alert,
  },
}));

const Signup = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Social - Sign Up";
  }, []);

  const handleSubmit = (values, errors) => {
    signup(values).then((data) => {
      if (data?.status === "success") {
        setOpen(true);
      }

      setMessage(data.message);

      data.errors && errors.setErrors(data.errors);
    });
  };

  return (
    <>
      <Card className={classes.card} elevation={0}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign Up
            {/* ALERT */}
            <Alert
              severity="error"
              onClose={() => setMessage("")}
              open={Boolean(message)}
              className={classes.alert}
            >
              {message}
            </Alert>
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form>
                <FormControl
                  className={classes.margin}
                  fullWidth
                  required
                  error={touched.name && Boolean(errors.name)}
                >
                  <InputLabel shrink htmlFor="name" className={classes.label}>
                    Name :
                  </InputLabel>
                  <Input
                    id="name"
                    fullWidth
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={touched.name && Boolean(errors.name)}
                  />
                  {touched.name && (
                    <FormHelperText>{errors.name}</FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  className={classes.margin}
                  fullWidth
                  required
                  error={touched.email && Boolean(errors.email)}
                >
                  <InputLabel shrink htmlFor="email" className={classes.label}>
                    Email Address :
                  </InputLabel>
                  <Input
                    id="email"
                    type="email"
                    fullWidth
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={touched.email && Boolean(errors.email)}
                  />

                  {touched.email && (
                    <FormHelperText>{errors.email}</FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  className={classes.margin}
                  fullWidth
                  required
                  error={touched.password && Boolean(errors.password)}
                >
                  <InputLabel
                    shrink
                    htmlFor="password"
                    className={classes.label}
                  >
                    Password :
                  </InputLabel>
                  <Input
                    id="password"
                    type="password"
                    fullWidth
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={touched.password && Boolean(errors.password)}
                  />

                  {touched.password && (
                    <FormHelperText>{errors.password}</FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  className={classes.margin}
                  fullWidth
                  required
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                >
                  <InputLabel
                    shrink
                    htmlFor="confirmPassword"
                    className={classes.label}
                  >
                    Confirm Password :
                  </InputLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    fullWidth
                    onChange={handleChange}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                  />

                  {touched.confirmPassword && (
                    <FormHelperText>{errors.confirmPassword}</FormHelperText>
                  )}
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  className={classes.button}
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
      <Dialog open={open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            autoFocus="autoFocus"
            variant="contained"
            component={Link}
            to="/signin"
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Signup;
