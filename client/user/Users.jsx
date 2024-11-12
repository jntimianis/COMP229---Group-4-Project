import { useState, useEffect } from "react";

import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Typography,
  ListItemText,
  makeStyles,
  Avatar,
  IconButton,
  Link,
  ArrowForward,
} from "@mui/material";

import { list } from "./api-user.js";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    // Define your card styles here
  },
  textField: {
    // Define your text field styles here
  },
  error: {
    // Define your error icon styles here
  },
  submit: {
    // Define your submit button styles here
  },
  title: {
    // Define your title styles here
  },
  root: {
    // Define your root styles here
  },
}));
export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal).then((data) => {
      console.log(data);
      if (data && data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setUsers(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        All Users
      </Typography>
      <List dense>
        {users.map((item, i) => {
          return (
            <Link component={RouterLink} to={"/user/" + item._id} key={i}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Paper>
  );
}
