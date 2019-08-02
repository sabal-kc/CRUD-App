const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql");
const schema = require("./schema.js");

const PORT = process.env.PORT || 4000;

const app = express();

mongoose
  .connect("mongodb://localhost/studentPortalData", {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
const db = mongoose.connection;

//Body-parser
app.use(express.urlencoded({extended: false}));


app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);

app.get("/", (req, res) => res.send("Home"));

app.listen(PORT, () => console.log(`App running on ${PORT}`));
