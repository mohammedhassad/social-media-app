import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Alert, Input } from "../../theme";
import { signin } from "./api-auth";
import { authenticate } from "./auth-helpers";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const initialValues = {
  email: "",
  password: "",
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

const Signin = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Social - Sign In";
  }, []);

  const handleSubmit = (values, errors) => {
    signin(values).then((data) => {
      if (data?.status === "success") {
        return authenticate(data, () => {
          navigate("/");
        });
      }

      setMessage(data.message);

      data.errors && errors.setErrors(data.errors);
    });
  };

  return (
    <Card className={classes.card} elevation={0}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Sign In
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
                error={touched.email && Boolean(errors.email)}
              >
                <InputLabel shrink htmlFor="email" className={classes.label}>
                  Email Adresse :
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
                <InputLabel shrink htmlFor="password" className={classes.label}>
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

              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                className={classes.button}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default Signin;
