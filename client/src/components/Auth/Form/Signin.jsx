import { StyledInput, StyledInputLabel } from "@/styles";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, FormControl, FormHelperText, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signin } from "../api-auth";
import { authenticate } from "../auth-helpers";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const initialValues = {
  email: "demo@example.com",
  password: "unsafepassword",
};

const AuthFormSignin = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (values, { setErrors, setSubmitting }) => {
    signin(values).then((data) => {
      if (data?.status === "success") {
        return authenticate(data, () => navigate("/"));
      }

      data?.errors && setErrors(data.errors);

      setMessage(data?.message);
      setSubmitting(false);
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, isSubmitting }) => (
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
                error={touched.email && Boolean(errors.email)}
              >
                <StyledInputLabel shrink htmlFor="email">
                  Email Adresse :
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

              <LoadingButton
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{
                  borderRadius: "5px",
                  padding: "10px 12px",
                }}
                loading={isSubmitting}
              >
                Sign In
              </LoadingButton>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default AuthFormSignin;
