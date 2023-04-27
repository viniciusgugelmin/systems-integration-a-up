import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
const domain = process.env.DOMAIN || `http://localhost:${port}`;

app.listen(port, () => {
  console.log(`Server running at ${domain}`);
});
