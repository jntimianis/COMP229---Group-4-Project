/** @format */

import { useState } from "react";
import "../src/signin.css";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import auth from "../lib/auth-helper.js";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { signin } from "../lib/api-auth.js";
import Langingpage from "../assets/images/landingpage.png";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
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

export default function Signin(props) {
  const location = useLocation();
  console.log(location.state);
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    console.log(user);
    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        console.log(data);
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { from } = location.state || {
    from: {
      pathname: "/",
    },
  };
  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    return <Navigate to={from} />;
  }

  return (
    <div>
      <div className="header-text">
        <h1>Concert Compass</h1>
        <p className="header-paragraph">
          Upload and rate your favorite concerts! Memories that last forever!
        </p>
      </div>
      <div className="main">
        <div className="left">
          <img src={Langingpage} width="800" className="image-border" />
        </div>
        <div className="right">
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" className={classes.title}>
                Sign In
              </Typography>
              <TextField
                id="email"
                type="email"
                label="Email"
                className={classes.textField}
                value={values.email}
                onChange={handleChange("email")}
                margin="normal"
              />
              <br />
              <TextField
                id="password"
                type="password"
                label="Password"
                className={classes.textField}
                value={values.password}
                onChange={handleChange("password")}
                margin="normal"
              />
              <br />{" "}
              {values.error && (
                <Typography component="p" color="error">
                  <Icon color="error" className={classes.error}>
                    error
                  </Icon>
                  {values.error}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                onClick={clickSubmit}
                className={classes.submit}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}
