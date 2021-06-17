import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  Avatar,
  Box,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { Alert, Input } from "../../theme";
import { isAuthenticated, authenticate } from "../Auth/auth-helpers";
import { getUser, updateUser } from "./api-user";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  about: Yup.string(),
  photo: Yup.mixed(),
});

let initialValues = {
  name: "",
  email: "",
  about: "",
  photo: {},
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
    marginBottom: theme.spacing(1),
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
    marginTop: 0,
    marginBottom: 5,
  },
  filename: {
    marginLeft: "10px",
  },
  large: {
    width: 60,
    height: 60,
    margin: "auto",
    marginBottom: theme.spacing(1),
  },
}));

const EditProfile = () => {
  const classes = useStyles();
  const formikRef = useRef();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [urlPhoto, setUrlPhoto] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Social - Edit Profile";
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getUser({ userId }, { jwt: isAuthenticated().token }, signal).then(
      (data) => {
        if (data?.status === "success") {
          setUrlPhoto(`/api/users/photo/${userId}`);

          if (formikRef.current) {
            formikRef.current.setFieldValue("name", data.user.name);
            formikRef.current.setFieldValue("about", data.user.about);
            formikRef.current.setFieldValue("email", data.user.email);
          }

          return;
        }

        navigate("/signin");
      }
    );
  }, [userId, navigate]);

  const handleSubmit = (values, errors) => {
    let formData = new FormData();

    values.name && formData.append("name", values.name);
    values.about && formData.append("about", values.about);
    values.email && formData.append("email", values.email);
    values.photo && formData.append("photo", values.photo);

    updateUser({ userId }, { jwt: isAuthenticated().token }, formData).then(
      (data) => {
        if (data?.status === "success") {
          const jwt = Object.assign(
            {},
            JSON.parse(localStorage.getItem("jwt")),
            data
          );

          authenticate(jwt, () => {
            navigate(`/user/${data.user._id}`);
          });
        }

        setMessage(data.message);

        data.errors && errors.setErrors(data.errors);
      }
    );
  };

  const handleFileChange = (event, form) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setUrlPhoto(reader.result);
      }
    };

    reader.readAsDataURL(event.currentTarget.files[0]);
    form.setFieldValue("photo", event.currentTarget.files[0]);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Edit Profile
        </Typography>
        <Avatar src={urlPhoto} className={classes.large} />
        <Formik
          innerRef={formikRef}
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
              {/* upload photo */}
              <Field name="photo">
                {({ field, form, meta }) => (
                  <Box mb={1}>
                    <input
                      id="icon-button-file"
                      name="photo"
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleFileChange(event, form)}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="icon-button-file">
                      <Button
                        variant="contained"
                        color="default"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload
                      </Button>
                      <span className={classes.filename}>
                        {field.value ? field.value.name : ""}
                      </span>
                    </label>
                  </Box>
                )}
              </Field>

              {/* ALERT */}
              <Alert
                severity="error"
                onClose={() => setMessage("")}
                open={Boolean(message)}
                className={classes.alert}
              >
                {message}
              </Alert>

              {/* name field */}
              <FormControl
                className={classes.margin}
                fullWidth
                // required
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
                {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
              </FormControl>

              {/* about field */}

              <FormControl
                className={classes.margin}
                fullWidth
                error={touched.about && Boolean(errors.about)}
              >
                <InputLabel shrink htmlFor="about" className={classes.label}>
                  About :
                </InputLabel>
                <Input
                  height="inherit"
                  id="about"
                  fullWidth
                  multiline
                  rows={3}
                  onChange={handleChange}
                  value={values.about}
                  name="about"
                  error={touched.about && Boolean(errors.about)}
                />
                {touched.about && (
                  <FormHelperText>{errors.about}</FormHelperText>
                )}
              </FormControl>

              {/* field email */}

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

              {/* button submit */}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                className={classes.button}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default EditProfile;
