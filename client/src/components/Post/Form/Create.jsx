import { isAuthenticated } from "@/components/Auth/auth-helpers";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  InputBase,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Field, Form, Formik } from "formik";
import { startCase } from "lodash";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { create } from "../api-post";
import { StyledCard, StyledPrimaryText, StyledSecondaryText } from "@/styles";

const initialValues = {
  text: "",
  photo: "",
};

const validationSchema = Yup.object().shape({
  text: Yup.string().required(),
  photo: Yup.mixed(),
});

const PostFormCreate = ({ addUpdate }) => {
  const theme = useTheme();
  const [postPhoto, setPostPhoto] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  useEffect(() => {
    setUserPhoto(`/api/users/photo/${isAuthenticated()?.user?._id}`);
  }, []);

  const handleSubmit = (values, { setErrors, resetForm, setSubmitting }) => {
    console.log("hello");
    let postData = new FormData();
    values.text && postData.append("text", values.text);
    values.photo && postData.append("photo", values.photo);

    console.log(values);

    create({ jwt: isAuthenticated().token }, postData).then((data) => {
      if (data?.status === "success") {
        resetForm();
        setPostPhoto("");
        addUpdate(data.post);
        return;
      }

      data.errors && setErrors(data.errors);
      setSubmitting(false);
    });
  };

  const handleFileChange = (event, form) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setPostPhoto(reader.result);
      }
    };

    reader.readAsDataURL(event.currentTarget.files[0]);
    form.setFieldValue("photo", event.currentTarget.files[0]);
  };

  return (
    <StyledCard
      elevation={0}
      maxwidth="600px"
      sx={{
        marginTop: theme.spacing(0),
      }}
    >
      <CardHeader
        avatar={
          <Box
            as={Link}
            to={"/user/" + isAuthenticated()?.user?._id}
            sx={{ textDecoration: "none" }}
          >
            <Avatar
              src={userPhoto}
              alt={startCase(isAuthenticated()?.user?.name)}
            />
          </Box>
        }
        title={
          <StyledPrimaryText
            as={Link}
            to={"/user/" + isAuthenticated()?.user?._id}
          >
            {startCase(isAuthenticated()?.user?.name)}
          </StyledPrimaryText>
        }
        subheader={
          <StyledSecondaryText as="span">
            {new Date().toDateString()}
          </StyledSecondaryText>
        }
      />

      <CardContent>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, isSubmitting, dirty }) => (
            <Form>
              <Stack spacing={2}>
                <Stack maxHeight="310px" overflow="auto" spacing={2}>
                  <InputBase
                    placeholder="What's on your mind, Jhon ..."
                    fullWidth
                    multiline
                    rows="4"
                    onChange={handleChange}
                    value={values.text}
                    name="text"
                    sx={{
                      paddingLeft: theme.spacing(2),
                      paddingRight: theme.spacing(2),
                      fontSize: 15,
                      color: "#57607C",
                      borderRadius: 5,
                    }}
                  />

                  {postPhoto && (
                    <Box px={2} height="120px">
                      <CardMedia
                        image={postPhoto}
                        sx={{
                          height: 0,
                          paddingTop: "56.25%",
                          borderRadius: "5px",
                        }}
                      />
                    </Box>
                  )}
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  border="1px solid #ced4da"
                  borderRadius="5px"
                  p={theme.spacing(1, 3)}
                >
                  <Typography>Add to your post</Typography>

                  <Field>
                    {({ form }) => (
                      <>
                        <Box
                          as="input"
                          id="icon-button-file"
                          name="photo"
                          type="file"
                          accept="image/*"
                          display="none"
                          onChange={(event) => handleFileChange(event, form)}
                        />

                        <label htmlFor="icon-button-file">
                          <IconButton color="secondary" component="span">
                            <PhotoCamera />
                          </IconButton>
                        </label>
                      </>
                    )}
                  </Field>
                </Stack>

                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!(dirty || Boolean(values?.photo))}
                  loading={isSubmitting}
                  sx={{
                    borderRadius: "5px",
                    padding: "10px 12px",
                  }}
                >
                  Post
                </LoadingButton>
              </Stack>
            </Form>
          )}
        </Formik>
      </CardContent>
    </StyledCard>
  );
};

PostFormCreate.propTypes = {
  addUpdate: PropTypes.func.isRequired,
};

export default PostFormCreate;
