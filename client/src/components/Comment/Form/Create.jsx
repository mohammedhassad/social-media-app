import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { StyledInput } from "../../../styles.js";

const initialValues = {
  text: "",
};

const validationSchema = Yup.object().shape({
  text: Yup.string().required(),
});

const CommentFormCreate = ({ addComment }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={addComment}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, isSubmitting, dirty }) => (
        <Form>
          <Stack direction="row" display="flex" alignItems="center" spacing={2}>
            <StyledInput
              id="text"
              name="text"
              placeholder="Add a comment..."
              fullWidth
              multiline
              rows={3}
              onChange={handleChange}
              value={values.text}
            />

            <LoadingButton
              type="submit"
              variant="text"
              size="small"
              color="primary"
              disabled={!dirty}
              loading={isSubmitting}
              sx={{
                textTransform: "Capitalize",
              }}
            >
              Post
            </LoadingButton>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

CommentFormCreate.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentFormCreate;
