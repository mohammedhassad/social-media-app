import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import * as Yup from "yup";
import { startCase } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  InputBase,
  Box,
} from "@material-ui/core";
import { isAuthenticated } from "../Auth/auth-helpers";
import { create } from "./api-post";

const initialValues = {
  text: "",
  photo: "",
};

const validationSchema = Yup.object().shape({
  text: Yup.string().required(),
  photo: Yup.mixed()
});

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
  },
  card: {
    ...theme.card,
    textAlign: "start",
    maxWidth: 600,
    marginTop: theme.spacing(0),
  },
  cardContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  photoButton: {
    height: 30,
  },
  input: {
    display: "none",
  },
  inputBase: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontSize: 15,
    color: "#57607C",
    borderRadius: 5,
  },
  button: {
    ...theme.buttonSubmit,
    marginTop: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    borderRadius: 5,
  },
  primaryText: {
    ...theme.primaryText,

    "& a": {
      color: "inherit",
      textDecoration: "inherit",
    },
  },
  secondaryText: {
    ...theme.secondaryText,
  },
}));

const CreatePost = ({ addUpdate }) => {
  const classes = useStyles();
  const [postPhoto, setPostPhoto] = useState("");

  const handleSubmit = (values, errors) => {
    let postData = new FormData();
    values.text && postData.append("text", values.text);
    values.photo && postData.append("photo", values.photo);

    create({ jwt: isAuthenticated().token }, postData).then((data) => {

      if (data?.status === "success") {
        errors.resetForm();
        setPostPhoto("");
        addUpdate(data.post);
        return;
      }

      data.errors && errors.setErrors(data.errors);
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

  const usePhoto = "/api/users/photo/" + isAuthenticated().user._id;

  return (
    <div className={classes.root}>
      <Card className={classes.card} elevation={0}>
        <CardHeader
          avatar={
            <Link to={"/user/" + isAuthenticated().user._id}>
              <Avatar
                src={usePhoto}
                alt={startCase(isAuthenticated().user.name)}
              />
            </Link>
          }
          title={
            <Link to={"/user/" + isAuthenticated().user._id}>
              {startCase(isAuthenticated().user.name)}
            </Link>
          }
          subheader={new Date().toDateString()}
          classes={{
            title: classes.primaryText,
            subheader: classes.secondaryText,
          }}
        />
        <CardContent>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              dirty,
            }) => (
              <Form>
                <Box maxHeight={310} overflow="auto" borderRadius={5}>
                  <InputBase
                    placeholder="What's on your mind, Jhon ..."
                    fullWidth
                    multiline
                    rows="4"
                    onChange={handleChange}
                    value={values.text}
                    name="text"
                    className={classes.inputBase}
                  />

                  {postPhoto && (
                    <Box px={2} height={120}>
                      <CardMedia className={classes.media} image={postPhoto} />
                    </Box>
                  )}
                </Box>

                <Box
                  border="1px solid #ced4da"
                  mt={2}
                  py={1}
                  px={3}
                  borderRadius={5}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Add to your post</Typography>
                  <Field>
                    {({ field, form, meta }) => (
                      <>
                        <input
                          id="icon-button-file"
                          name="photo"
                          type="file"
                          accept="image/*"
                          onChange={(event) => handleFileChange(event, form)}
                          className={classes.input}
                        />
                        <label htmlFor="icon-button-file">
                          <IconButton color="secondary" component="span">
                            <PhotoCamera />
                          </IconButton>
                        </label>
                      </>
                    )}
                  </Field>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.button}
                  disabled={!(dirty || Boolean(values.photo))}
                >
                  Post
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

CreatePost.propTypes = {
  addUpdate: PropTypes.func.isRequired,
};

export default CreatePost;
