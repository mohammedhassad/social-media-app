import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { follow, unfollow } from "./api-user";

const UserFollowButton = ({ following, handleClickButton }) => {
  const handleClickFollow = () => {
    handleClickButton(follow);
  };

  const handleClickUnfollow = () => {
    handleClickButton(unfollow);
  };

  return (
    <Button
      size="small"
      color={following ? "secondary" : "primary"}
      onClick={following ? handleClickUnfollow : handleClickFollow}
      sx={{
        textTransform: "Capitalize",
      }}
    >
      {following ? "Unfollow" : "Follow"}
    </Button>
  );
};

UserFollowButton.propTypes = {
  following: PropTypes.bool.isRequired,
  handleClickButton: PropTypes.func.isRequired,
};

export default UserFollowButton;
