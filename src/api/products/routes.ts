import express, { NextFunction, Request, Response, Router } from "express";
import ProductController from "./controller/ProductController";
import verifyUser from "../../middlewares/verifyUser";
export const productRouter = Router();
const productController = new ProductController();

productRouter.get("/", (req: Request, res: Response) =>
  productController.get(req, res)
);

productRouter.get("/all/", [verifyUser], (req: Request, res: Response) =>
  productController.getAll(req, res)
);

productRouter.get("/total_sold/", [verifyUser], (req: Request, res: Response) =>
  productController.getTotalProductsSold(req, res)
);

productRouter.post("/", (req: Request, res: Response) =>
  productController.post(req, res)
);

productRouter.patch("/", (req: Request, res: Response) =>
  productController.update(req, res)
);

productRouter.delete("/", (req: Request, res: Response) =>
  productController.delete(req, res)
);
