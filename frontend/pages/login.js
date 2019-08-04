import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "next/link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import gql from "graphql-tag";
import { Query } from "react-apollo";
import Router from "next/router";

export class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    emailError: false,
    passwordError: false,
    emailErrorText: "",
    passwordErrorText: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.email === "")
      this.setState({
        emailError: true,
        emailErrorText: "Email cannot be empty"
      });
    const requestBody = {
      query: `
          query {
            login(email: "${this.state.email.trim()}", password: "${this.state.password.trim()}") {
              userId
              token
              tokenExpiration
            }
          }
        `
    };

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        if (resData.data.login && resData.data.login.token) {
            window.localStorage.setItem('token', resData.data.login.token);
          this.setState({
            emailError: false,
            passwordError: false,
            emailErrorText: "",
            passwordErrorText: ""
          });
          Router.push("/home");
        } else if (resData.errors) {
          console.log(resData.errors[0]);
          this.setState({ emailError: true, passwordError: true });
          this.setState({
            emailErrorText: resData.errors[0].message,
            passwordErrorText: resData.errors[0].message
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const classes = {
      paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      },
      avatar: {
        backgroundColor: "white"
      },
      form: {
        paddingTop: "50px",
        paddingBottom: "50px",
        width: "100%" // Fix IE 11 issue.
      },
      submit: {
        marginTop: "50px",
        marginBottom: "10px"
      }
    };
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={classes.paper}>
          <Avatar style={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form style={classes.form} onSubmit={this.handleSubmit}>
            <TextField
              value={this.state.email}
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              error={this.state.emailError}
              helperText={this.state.emailErrorText}
              //   autoComplete="email"
            />
            <TextField
              value={this.state.password}
              onChange={this.handleChange}
              error={this.state.passwordError}
              helperText={this.state.passwordErrorText}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              //   autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={classes.submit}
            >
              Login
            </Button>

            <Link href="/signup" variant="body2">
              <a>{"Don't have an account? Sign Up"}</a>
            </Link>
          </form>
        </div>
        <Box mt={5} />
      </Container>
    );
  }
}

export default LoginForm;
