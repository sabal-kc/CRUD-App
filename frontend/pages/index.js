import React from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Mutation } from "react-apollo";
import Container from "@material-ui/core/Container";
function App() {
  return (
    <div
      className="App"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundImage: "url('../static/background2.jpg')",
        backgroundSize: "100% 100%",
        width: "auto%",
        height: "100%"
      }}
    >
      <Container component="main" maxWidth="md">
        <Typography
          component="h1"
          variant="h3"
          style={{
            margin: "30px auto",
            display: "block",
            alignItems: "center"
          }}
        >
          <p>Student Portal Management System</p>
        </Typography>
        <Link href="/login">
          <Button
            size="large"
            variant="contained"
            color="primary"
            style={{ margin: "0 auto", display: "block" }}
          >
            <a>Get Started</a>
          </Button>
        </Link>
        {/* <Link href="/signup">
        <Button variant="contained">
      </div>
          <a>Signup</a>
        </Button>
      </Link> */}
      </Container>
    </div>
  );
}

export default App;
