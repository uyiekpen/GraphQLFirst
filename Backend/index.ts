import express, { Application } from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import mongoose from "mongoose";

const port: Number = 6100;

const app: Application = express();

const url: Application = "mongodb://127.0.0.1/Signdb";

mongoose.connect(url).then(() => {
  console.log(`connected`);
});

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.use(cors());

app.use(express.json());

app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
