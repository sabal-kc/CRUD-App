import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Router from "next/router";
export class Signup extends Component {
  state = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
    birthday: "1990-01-01",
    gender: "male",
    error: false,
    errorMsg: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleChangeDrop = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ error: false, errorMsg: "" });
    if (isNaN(this.state.phone)) {
      this.setState({ error: true, errorMsg: "Invalid form input" });
      return;
    }

    const requestBody = {
      query: `
            query {
              signup(firstName: "${this.state.firstname}", 
              lastName: "${this.state.lastname}", 
              mobileNumber: "${this.state.phone}", 
              email: "${this.state.email}", 
              birthday: "${this.state.birthday}", 
              gender: "${this.state.gender}", 
              password: "${this.state.password}") {
                email
              }
            }
          `
    };
    console.log(JSON.stringify(requestBody));
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
        if (resData.data.signup && resData.data.signup.email) {
          Router.push("/login");
        } else if (resData.errors) {
          this.setState({
            error: true,
            errorMsg: "Error in form input/email and phone must be unique"
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
        <div style={classes.paper} className={classes.root}>
          <Avatar style={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form style={classes.form} onSubmit={this.handleSubmit}>
            <TextField
              value={this.state.firstname}
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={this.state.error}
              helperText={this.state.errorMsg}
              id="firstname"
              label="First name"
            />

            <TextField
              value={this.state.lastname}
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Last name"
            />
            <TextField
              value={this.state.phone}
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone number"
            />

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
              autoComplete="email"
            />
            <TextField
              value={this.state.password}
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              style={{ marginBottom: "30px" }}
            />

            <FormControl>
              <InputLabel htmlFor="gender">Gender</InputLabel>
              <Select
                value={this.state.gender}
                onChange={this.handleChangeDrop}
                inputProps={{
                  name: "gender",
                  id: "gender"
                }}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              style={{ marginLeft: "100px" }}
              required
              id="birthday"
              label="Birthday"
              type="date"
              value={this.state.birthday}
              onChange={this.handleChange}
              InputLabelProps={{
                shrink: true
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={classes.submit}
            >
              Register
            </Button>
          </form>
        </div>
        <Box mt={5} />
      </Container>
    );
  }
}

export default Signup;
