import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { rootRouter } from "./routers";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
const domain = process.env.DOMAIN || `http://localhost:${port}`;

app.use(express.json());
app.use(cors());

app.use(rootRouter);

app.listen(port, () => {
  console.log(`Server running at ${domain}`);
});
