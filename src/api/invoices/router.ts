import express, { Request, Response, Router } from "express"
import InvoiceController from "./controller/InvoiceController"

import verifyUser from "../../middlewares/verifyUser"
export const invoiceRouter = Router() 

const invoiceController = new InvoiceController()

invoiceRouter.get("/", [verifyUser], (req: Request, res: Response) => invoiceController.get(req, res))
invoiceRouter.get("/:id", (req: Request, res: Response) => invoiceController.getById(req, res))
invoiceRouter.post("/", [verifyUser], (req: Request, res: Response) => invoiceController.post(req, res))
invoiceRouter.patch("/", [verifyUser], (req: Request, res: Response) => invoiceController.update(req, res))
invoiceRouter.delete("/", [verifyUser], (req: Request, res: Response) => invoiceController.delete(req, res))
