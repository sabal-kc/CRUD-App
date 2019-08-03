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
export class AddStudent extends Component {
  state = {
    name: "",
    class: "One",
    age: 0,
    roll: "",
    email: "",
    phone: "",
    address: "",
    error: false,
    errorMsg: "",
    buttonName: "Register"
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

  componentDidMount() {
    if (this.props.flag && this.props.flag === "edit") {
      const id = this.props.id;
      const requestBody = {
        query: `
            query{
                student(id: "${id}") {
                id
                name
                phoneNumber
                address
                age
                class
                rollNumber
                email
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
          const currentStudent = resData.data.student;
          this.setState({
            name: currentStudent.name,
            class: currentStudent.class,
            age: currentStudent.age,
            roll: currentStudent.rollNumber,
            email: currentStudent.email,
            phone: currentStudent.phoneNumber,
            address: currentStudent.address,
            buttonName: "Update"
          });
        });
    }
  }

  handleSubmit = event => {
    this.setState({ error: false, errorMsg: "" });
    event.preventDefault();

    if (isNaN(this.state.phone) || isNaN(this.state.age)) {
      this.setState({ error: true, errorMsg: "Invalid form data" });
      return;
    }

    let requestBody;
    if (this.props.flag && this.props.flag === "edit") {
      requestBody = {
        query: `mutation{
            editStudent(
                id: "${this.props.id}",
                name:"${this.state.name}", 
                class:"${this.state.class}",
                age:${this.state.age}, 
                rollNumber:"${this.state.roll}", 
                phoneNumber:"${this.state.phone}", 
                email:"${this.state.email}", 
                address:"${this.state.address}"
            ){
                id,
                name,
                class,
                rollNumber
            }
        }
      `
      };
    } else {
      requestBody = {
        query: `mutation{
                addStudent(
                    name:"${this.state.name}", 
                    class:"${this.state.class}",
                    age:${this.state.age}, 
                    rollNumber:"${this.state.roll}", 
                    phoneNumber:"${this.state.phone}", 
                    email:"${this.state.email}", 
                    address:"${this.state.address}"
                ){
                    id,
                    name,
                    class,
                    rollNumber
                }
            }
          `
      };
    }
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
        if ((resData.data.addStudent && resData.data.addStudent.id) ||(resData.data)){
          Router.push("/home");
        } else if (resData.errors) {
          this.setState({
            error: true,
            errorMsg: "Error in form input/Roll, email and phone must be unique"
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
        paddingTop: "10px",
        paddingBottom: "10px",
        width: "100%" // Fix IE 11 issue.
      },
      submit: {
        marginTop: "10px",
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
            Student Details
          </Typography>
          <form style={classes.form} onSubmit={this.handleSubmit}>
            <TextField
              error={this.state.error}
              helperText={this.state.errorMsg}
              value={this.state.name}
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
            />
            <FormControl
              style={{
                margin: "10px",
                fullWidth: true,
                display: "flex",
                wrap: "nowrap"
              }}
            >
              <InputLabel htmlFor="class">Class</InputLabel>
              <Select
                style={{ width: "100%" }}
                value={this.state.class}
                onChange={this.handleChangeDrop}
                inputProps={{
                  name: "class",
                  id: "class"
                }}
              >
                <MenuItem value={"One"}>One</MenuItem>
                <MenuItem value={"Two"}>Two</MenuItem>
                <MenuItem value={"Three"}>Three</MenuItem>
                <MenuItem value={"Four"}>Four</MenuItem>
                <MenuItem value={"Five"}>Five</MenuItem>
                <MenuItem value={"Six"}>Six</MenuItem>
                <MenuItem value={"Seven"}>Seven</MenuItem>
                <MenuItem value={"Eight"}>Eight</MenuItem>
                <MenuItem value={"Nine"}>Nine</MenuItem>
                <MenuItem value={"Ten"}>Ten</MenuItem>
              </Select>
            </FormControl>
            <TextField
              value={this.state.age}
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="age"
              label="Age"
            />
            <TextField
              value={this.state.roll}
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="roll"
              label="Roll number"
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
              value={this.state.phone}
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Phone"
              id="phone"
            />

            <TextField
              value={this.state.address}
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Address"
              id="address"
              style={{ marginBottom: "30px" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={classes.submit}
            >
             {this.state.buttonName}
            </Button>
          </form>
        </div>
        <Box mt={5} />
      </Container>
    );
  }
}

export default AddStudent;
