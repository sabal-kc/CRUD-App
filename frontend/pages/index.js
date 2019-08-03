import React from "react";
import LoginForm from "./login";
import Link from "next/link";

import ApolloClient from "apollo-boost";
import { ApolloProvider, Mutation } from "react-apollo";

global.fetch = require("node-fetch");

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/signup">
          <a>Signup</a>
        </Link>
      </div>
    </ApolloProvider>
  );
}

export default App;
