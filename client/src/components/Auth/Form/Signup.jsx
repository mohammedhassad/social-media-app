import { StyledInput, StyledInputLabel } from "@/styles";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Stack,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { signup } from "../api-auth";

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

const AuthFormSignup = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (values, { setErrors, setSubmitting }) => {
    signup(values).then((data) => {
      if (data?.status === "success") {
        setOpen(true);
      }

      data?.errors && setErrors(data?.errors);

      setMessage(data?.message);
      setSubmitting(false);
    });
  };

  return (
    <>
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

          isSubmitting,
        }) => (
          <Form>
            <Stack spacing={2}>
              <Box width="100%">
                <Alert
                  variant="filled"
                  severity={message ? "error" : "info"}
                  sx={{
                    fontWeight: 400,
                    textAlign: "start",
                  }}
                >
                  {message ? (
                    message
                  ) : (
                    <>
                      Use <strong>demo@example.com</strong> and{" "}
                      <strong>unsafepassword</strong> to sign in
                    </>
                  )}
                </Alert>
              </Box>

              <Stack spacing={2}>
                <FormControl
                  variant="standard"
                  fullWidth
                  required
                  error={touched.name && Boolean(errors.name)}
                >
                  <StyledInputLabel shrink htmlFor="name">
                    Name :
                  </StyledInputLabel>

                  <StyledInput
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
                  variant="standard"
                  fullWidth
                  required
                  error={touched.email && Boolean(errors.email)}
                >
                  <StyledInputLabel shrink htmlFor="email">
                    Email Address :
                  </StyledInputLabel>

                  <StyledInput
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
                  variant="standard"
                  fullWidth
                  required
                  error={touched.password && Boolean(errors.password)}
                >
                  <StyledInputLabel shrink htmlFor="password">
                    Password :
                  </StyledInputLabel>
                  <StyledInput
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
                  variant="standard"
                  fullWidth
                  required
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                >
                  <StyledInputLabel shrink htmlFor="confirmPassword">
                    Confirm Password :
                  </StyledInputLabel>

                  <StyledInput
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

                <LoadingButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  loading={isSubmitting}
                  sx={{
                    borderRadius: "5px",
                    padding: "10px 12px",
                  }}
                >
                  Sign Up
                </LoadingButton>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>

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
            sx={{
              borderRadius: "5px",
              padding: "10px 12px",
            }}
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AuthFormSignup;
