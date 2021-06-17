import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { unfollow, follow } from "./api-user";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "Capitalize",
    fontSize: 13,
    fontWeight: theme.typography.fontWeightMedium,
    fontFamily: theme.typography.fontFamily,

    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

const FollowProfileButton = ({ following, handleClickButton }) => {
  const classes = useStyles();

  const handleClickFollow = () => {
    handleClickButton(follow);
  };

  const handleClickUnfollow = () => {
    handleClickButton(unfollow);
  };

  return (
    <div>
      {following ? (
        <Button
          color="secondary"
          onClick={handleClickUnfollow}
          className={classes.button}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          color="primary"
          onClick={handleClickFollow}
          className={classes.button}
        >
          Follow
        </Button>
      )}
    </div>
  );
};

FollowProfileButton.prototype = {
  following: PropTypes.bool.isRequired,
  handleClickButton: PropTypes.func.isRequired,
};

export default FollowProfileButton;
