const express = require("express");
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql");
const bodyParser = require('body-parser');

const schema = require("./graphql/schema");
const auth = require("./middlewares/auth");

const PORT = process.env.PORT || 4000;

const app = express();

//Middlewares
app.use(bodyParser.json());
//Authentication middleware
app.use(auth);

mongoose
  .connect("mongodb://localhost/studentPortalData", {
      useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//Body-parser
// app.use(express.urlencoded({extended: false}));

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);

app.get("/", (req, res) => res.send("Home"));

app.listen(PORT, () => console.log(`App running on ${PORT}`));
