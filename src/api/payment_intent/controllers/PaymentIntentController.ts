import { Request, Response } from "express";
import { Pages, Prisma, PrismaClient } from '@prisma/client'
import { prisma } from "../../../index";

function isNumeric(str: any) {
	if (typeof str != "string") return false // we only process strings!  
	// @ts-ignore
	return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		   !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
  

class PaymentIntentController {

	get = async (req: Request, res: Response) => {
		const data = req.query
		
		console.log(res.locals.user.id, data)

		const paymentIntent = await prisma.paymentIntent.findMany({
			where: {
				userId: res.locals.user.id,
				...data
			}
		})
		
		res.status(200).send(paymentIntent)
	}

	getSingleIntent = async (req: Request, res: Response) => {
		const id = req.params.id

		const paymentIntent = await prisma.paymentIntent.findFirst({
			where: {
				id: id
			}
		})

		if(!paymentIntent) {
			res.status(400).send({
				error: "Intent Doesn't Exists",
				status: 400
			})
			return
		}
		
		res.status(200).send(paymentIntent)
	}

	post = async (req: Request, res: Response) => {
		let paymentIntentData = req.body

		var paymentIntent
		try {
			paymentIntent = await prisma.paymentIntent.create({
				data: {
					...paymentIntentData,
					userId: res.locals.user.id
				}
			})
		} catch (e) {
			console.log(e)
			res.status(400).send({
				error: e,
				status: 400
			})
			return
		}

		res.status(201).send(paymentIntent)
	}

	batch = async (req: Request, res: Response) => {
		let intent = req.body
		let user = {
			connect: [{id: res.locals.user.id}]
		}

		let paymentIntentData = { ...intent, user }
		
		var paymentIntent

		try {
			paymentIntent = await prisma.paymentIntent.createMany({
				data: paymentIntentData
			})
		} catch (e) {
			res.status(400).send({
				error: e,
				status: 400
			})
			return
		}

		res.status(201).send(paymentIntent)
	}

	update = async (req: Request, res: Response) => {
		const { id, ...paymentIntentData } = req.body

		var paymentIntent
		try {
			paymentIntent = await prisma.paymentIntent.update({
				where: {
					id: id
				},
				data: paymentIntentData
			})
		} catch (e) {
			console.log(e)
			res.status(400).send({
				error: e,
				status: 400
			})
			return
		}

		res.status(200).send(paymentIntent)
	}

	delete = async (req: Request, res: Response) => {
		const { id } = req.query
		var paymentIntent

		try {
			paymentIntent = await prisma.paymentIntent.delete({
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

		res.status(204).send(paymentIntent)
	}
}

export default PaymentIntentController