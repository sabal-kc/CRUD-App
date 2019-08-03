import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import Router from "next/router";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Home extends React.Component {
  state = {
    tableRows: [],
    dialogOpen: false,
  };

  createData = (id, rollNumber, name, classRoom, email) => {
    return { id, rollNumber, name, classRoom, email };
  };

  fetchStudentData = async () => {
    const requestBody = {
      query: `
      query {
          students{
              id
              name
              class
              rollNumber
              email
          }
      }
      `
    };
    let tableRows = [];
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
        resData.data.students.forEach(element => {
          tableRows.push(
            this.createData(
              element.id,
              element.rollNumber,
              element.name,
              element.class,
              element.email
            )
          );
        });
        this.setState({ tableRows });
        console.log(resData.data.students);
      });
  };

  handleOnDelete = e => {
    console.log(e.currentTarget.id);
    const requestBody = {
      query: `
        mutation{
            deleteStudent(id:"${e.currentTarget.id}"){
              name
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
    }).then(res => {
      console.log(res);
      this.setState({dialogOpen: false});
      this.fetchStudentData();
    });
  };

  handleOnEdit = e => {
    Router.push({ pathname: "/update", query: { id: e.currentTarget.id } });
  };

  handleClickOpen = () => {
    this.setState({dialogOpen: true});
}

handleClose = ()=> {
    this.setState({dialogOpen: false});
  }

  componentDidMount() {
    this.fetchStudentData();
  }
  render() {
    return (
      <Paper>
        <Link href="/addStudent">
          <Button fullWidth variant="contained" color="primary">
            <a>Add student</a>
          </Button>
        </Link>

        <Typography
          component="h1"
          variant="h6"
          style={{ marginTop: "30px", marginLeft: "15px" }}
        >
          List of students
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Roll Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.tableRows.map(row => (
              <TableRow key={row.rollNumber}>
                <TableCell>{row.rollNumber}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.classRoom}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ margin: "2px" }}
                      id={row.id}
                      onClick={this.handleOnEdit}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ margin: "2px" }}
                      id={row.id}
                      onClick={this.handleClickOpen}
                    >
                      Delete
                    </Button>

                    <Dialog
                      open={this.state.dialogOpen}
                      onClose={this.handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Delete student"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure you want to delete?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button id= {row.id} onClick={this.handleOnDelete} color="primary">
                          Yes
                        </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                          No
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
