import express from "express";
import winnersRouter from "./routes/winners";

const app = express();

app.use(express.json());
app.use("/winners", winnersRouter);

export default app;
