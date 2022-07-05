import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../index";
export interface Product {
  id: number;
  discounted_price: number;
  price: number;
  name: string;
  description: string;
  links: string[];
  sold: number;
  user: number;
  image: File;
}

class ProductController {
  get = async (req: Request, res: Response) => {
    const id: number = Number(req.query["id"]);
    let product;
    try {
      product = await prisma.product.findFirst({
        where: {
          id: id,
        },
      });
    } catch (e) {
      res.status(400).send({
        error: e,
        status: 400,
      });
    }
    res.status(200).send(product);
  };

  getAll = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
      where: {
        userId: res.locals.user.id
      }
    })

    if(!products) {
      res.status(400).send({
        error: "Can't find products",
        status: 4000
      })
      return
    }

    res.status(200).send(products)
  }

  getTotalProductsSold = async (req: Request, res: Response) => {
    const total_sold = await prisma.product.aggregate({
      _sum: {
        sold: true
      },
      where: {
        userId: res.locals.user.id
      }
    })

    if(!total_sold) {
      res.status(400).send({
        error: "Can't find products",
        status: 4000
      })
      return
    }

    res.status(200).send(total_sold)
  }

  post = async (req: Request, res: Response) => {
    const producData = req.body;
    let product;
    try {
      product = await prisma.product.create({
        data: producData,
      });
    } catch (e) {
      res.status(400).send({
        error: e,
        status: 400,
      });
    }
    res.status(200).send(product);
  };

  update = async (req: Request, res: Response) => {
    const productId: number = Number(req.query.id);
    const productData: any = JSON.parse(req.body) as Product;
    let updatedProduct;
    try {
      updatedProduct = await prisma.product.update({
        where: {
          id: productId,
        },
        data: productData,
      });
    } catch (e) {
      res.status(400).send({
        error: e,
        status: 400,
      });
    }
    res.status(201).send(updatedProduct);
  };
  delete = async (req: Request, res: Response) => {
    const { id } = req.query;
    let product;

    try {
      product = await prisma.product.delete({
        where: {
          id: Number(id),
        },
      });
    } catch (e) {
      res.status(400).send({
        error: e,
        status: 400,
      });
      return;
    }

    res.status(204).send(product);
  };
}

export default ProductController;
