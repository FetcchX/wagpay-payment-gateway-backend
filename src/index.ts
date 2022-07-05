import express, { Request, Response } from "express";

import cors from "cors";
import * as dotenv from "dotenv";
import http from "http";
import { pageRouter } from "./api/pages/router";
import { userRouter } from "./api/users/router";
import { submissionRouter } from "./api/submissions/router";
import { paymentIntentRouter } from "./api/payment_intent/router";
import { productRouter } from "./api/products/routes";
import { invoiceRouter } from "./api/invoices/router";
import { PrismaClient } from "@prisma/client";
import { strangeRouter } from "./strange/router";

dotenv.config();

export const prisma = new PrismaClient();

const PORT: number = parseInt(process.env.PORT as string) | 5000;
console.log(process.env.PORT, PORT)
const app = express();
const server = http.createServer(app);

app.use(express.static('files'))
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    allowedHeaders: ["Content-Type", "bearer-token", "api-key"],
    origin: ["http://localhost:3000", "https://wagpay.xyz"],
  })
);
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send("gm");
});

app.use("/api/pages/", pageRouter);
app.use("/api/submissions/", submissionRouter);
app.use("/api/paymentIntents/", paymentIntentRouter);
app.use("/api/user/", userRouter);
app.use("/api/products/", productRouter);
app.use("/api/invoices/", invoiceRouter);
app.use("/api/routes/", strangeRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server listening @ ${process.env.PORT}`);
});
