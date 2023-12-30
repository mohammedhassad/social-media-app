import { authenticate, isAuthenticated } from "@/components/Auth/auth-helpers";
import { getUser, updateUser } from "@/components/User/api-user";
import { StyledInput, StyledInputLabel } from "@/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Stack,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

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

const UserFormEdit = () => {
  const formikRef = useRef();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [urlPhoto, setUrlPhoto] = useState("");
  const [message, setMessage] = useState("");

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

  const handleSubmit = (values, { setErrors, setSubmitting }) => {
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

        data?.errors && setErrors(data.errors);

        setMessage(data?.message);
        setSubmitting(false);
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
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, isSubmitting }) => (
        <Form>
          <Stack spacing={3}>
            {/* ALERT */}
            {message && (
              <Box width="100%">
                <Alert
                  variant="filled"
                  severity="error"
                  sx={{
                    fontWeight: 400,
                    textAlign: "start",
                  }}
                >
                  {message}
                </Alert>
              </Box>
            )}

            <Stack spacing={1} alignItems="center">
              <Avatar src={urlPhoto} sx={{ width: "100px", height: "100px" }} />

              {/* upload photo */}
              <Field name="photo">
                {({ field, form }) => (
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
                        // color="default"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload
                      </Button>

                      <Box as="span" ml={2}>
                        {field.value ? field.value.name : ""}
                      </Box>
                    </label>
                  </Box>
                )}
              </Field>
            </Stack>

            <Stack spacing={2}>
              {/* name field */}
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

                {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
              </FormControl>

              <FormControl
                variant="standard"
                fullWidth
                error={touched.about && Boolean(errors.about)}
              >
                <StyledInputLabel shrink htmlFor="about">
                  About :
                </StyledInputLabel>

                <StyledInput
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

              {/* button submit */}
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
                Save
              </LoadingButton>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default UserFormEdit;
