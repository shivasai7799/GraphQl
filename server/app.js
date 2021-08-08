const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

//allow cross origin requests

const url =
  "mongodb+srv://shivasairao210:Padmarao!7799@cluster0.e506f.mongodb.net/GRAPHQL?retryWrites=true&w=majority";

// connect to mlab database
// make sure to replace my db string & creds with your own
// mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true,
//   useCreateIndex:true,useFindAndModify:true})
// mongoose.connection.once('open', () => {
//     console.log('conneted to database');
// });

mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    app.listen(4001, () => {
      console.log("Listening for requests on port 4000");
      console.log("Connected to server || Server has Started");
    });
    
  })

mongoose.connection.once("open", () => {
  console.log("conneted to database");
});

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// app.listen(4000, () => {
//   console.log("now listening for requests on port 4000");
// });
