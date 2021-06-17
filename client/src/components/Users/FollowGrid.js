import React from "react";
import { Avatar, GridList, GridListTile, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { startCase } from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  large: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  gridList: {
    width: "100%",
    height: 220,

    [theme.breakpoints.down("md")]: {
      "& li": {
        width: "50% !important",
      },
    },
  },
  tileText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: "0.875rem",
    color: "#262626",
    fontWeight: theme.typography.fontWeightMedium,

    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const FollowGrid = ({ users }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {users?.map((user, index) => (
          <GridListTile key={index} style={{ height: 120 }}>
            <Link to={`/user/${user._id}`} style={{ textDecoration: "none" }}>
              <Avatar
                src={`/api/users/photo/${user._id}`}
                alt={startCase(user.name)}
                className={classes.large}
              />
              <Typography className={classes.tileText}>
                {startCase(user.name)}
              </Typography>
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

FollowGrid.prototype = {
  users: PropTypes.array.isRequired,
};

export default FollowGrid;
