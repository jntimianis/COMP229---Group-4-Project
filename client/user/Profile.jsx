/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Typography,
  ListItemText,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";

import DeleteUser from "./DeleteUser";
import auth from "../lib/auth-helper.js";
import { read } from "./api-user.js";
import { useLocation, Navigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    padding: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));
export default function Profile({ match }) {
  const location = useLocation();
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();
  const { userId } = useParams();
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    read(
      {
        userId: userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);

  if (redirectToSignin) {
    return (
      <Navigate to="/signin" state={{ from: location.pathname }} replace />
    );
  }
  if (auth.isAuthenticated()) {
    console.log(auth.isAuthenticated().user._id);
    console.log(user._id);
  }
  return (
    <Paper sx={{ maxWidth: 1 / 4 }} className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />{" "}
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id == user._id && (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + user._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <EditIcon />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"Joined: " + new Date(user.created).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  );
}
