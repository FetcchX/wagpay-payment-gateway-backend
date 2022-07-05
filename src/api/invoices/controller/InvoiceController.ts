import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../../index";

function isNumeric(str: any) {
	if (typeof str != "string") return false // we only process strings!  
	// @ts-ignore
	return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		   !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
  

class InvoiceController {

	get = async (req: Request, res: Response) => {
		const data = {} as any
		Object.keys(req.query).map(value => {if(isNumeric(req.query[value])) data[value] = Number(req.query[value])})
		
		const paymentIntent = await prisma.invoice.findMany({
			where: {
				page: {
					userId: res.locals.user.id
				}
			}
		})
		
		let return_data = {
			cursor: 0,
			data: paymentIntent
		}

		res.status(200).send(return_data)
	}

	getById = async (req: Request, res: Response) => {
		const paymentIntent = await prisma.invoice.findMany({
			where: {
				id: req.query.id as string
			},
			include: {
				products: true
			}
		})
		
		res.status(200).send(paymentIntent[0])
	}

	post = async (req: Request, res: Response) => {
		let invoiceData = req.body

		var invoice
		try {
			invoice = await prisma.invoice.create({
				data: invoiceData
			})
		} catch (e) {
			console.log(e)
			res.status(400).send({
				error: e,
				status: 400
			})
			return
		}

		res.status(201).send(invoice)
	}

	batch = async (req: Request, res: Response) => {
		const invoiceData: Prisma.Enumerable<Prisma.InvoiceCreateManyInput> = req.body

		var invoice

		try {
			invoice = await prisma.invoice.createMany({
				data: invoiceData
			})
		} catch (e) {
			res.status(400).send({
				error: e,
				status: 400
			})
			return
		}

		res.status(201).send(invoice)
	}

	update = async (req: Request, res: Response) => {
		const { id, ...invoiceData } = req.body

		var invoice
		try {
			invoice = await prisma.invoice.update({
				where: {
					id: id
				},
				data: invoiceData
			})
		} catch (e) {
			res.status(400).send({
				error: e,
				status: 400
			})
			return
		}

		res.status(200).send(invoice)
	}

	delete = async (req: Request, res: Response) => {
		const { id } = req.query
		var invoice

		try {
			invoice = await prisma.invoice.delete({
				where: {
					id: id as string
				}
			})
		} catch (e) {
			res.status(400).send({
				error: e,
				status: 400
			})
			return
		}

		res.status(204).send(invoice)
	}
}

export default InvoiceController
