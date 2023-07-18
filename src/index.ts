import dotenv from "dotenv";
dotenv.config();

import express, { type Express } from "express";
import mongoose from "mongoose";
import { rootHandler, helloHandler } from './hendlesr';

const app: Express = express();

mongoose.set("strictQuery", false);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get('/', rootHandler);
app.get('/hello/:name', helloHandler);

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    console.log("Connected to MongoDB...");
  } catch (err) {
    console.log(`Could not connect to MongoDB... ${err as string}`);
  }
})();

const port = process.env.PORT ?? 5050;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = {
  server,
};