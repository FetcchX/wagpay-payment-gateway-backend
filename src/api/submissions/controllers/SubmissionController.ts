import { Request, Response } from "express";
import { Pages, Prisma, PrismaClient } from '@prisma/client'
import { prisma } from "../../../index";
import { send_email, send_webhook_data } from "../../../utils/webhook";

function isNumeric(str: any) {
	if (typeof str != "string") return false // we only process strings!  
	// @ts-ignore
	return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		   !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
  

class SubmissionController {
	get = async (req: Request, res: Response) => {
		const data = {} as any
		Object.keys(req.query).map(value => {if(isNumeric(req.query[value]) && value !== 'cursor') data[value] = Number(req.query[value])})
		
		var page_ids = []
		var submissions: any[] = []

		try {
			page_ids = await prisma.pages.findMany({
				take: 20,
				skip: 1,
				cursor: {
					id: Number(req.query.cursor)
				},
				select: {
					submissions: {
						include: {
							page: {
								select: {
									slug: true,
									id: true,
									title: true
								}
							},
							products: {
								select: {
									name: true,
									discounted_price: true
								}
							}
						}
					}
				},
				where: {
					userId: res.locals.user.id
				}
			})

			if(!page_ids) throw "Go Down Bitches"
			
			submissions = page_ids.map(value => value.submissions).flat()
		} catch (e) {
			console.log(e, "dsa")
			page_ids = await prisma.pages.findMany({
				take: 20,
				select: {
					submissions: {
						include: {
							page: {
								select: {
									slug: true,
									id: true,
									title: true
								}
							},
							products: {
								select: {
									name: true,
									discounted_price: true
								}
							}
						}
					}
				}
				
			})
			
			if(!page_ids) {
				res.status(400).send({
					error: "Submissions not found",
					status: 400
				})
				return
			}
			console.log(page_ids, "page_ids")
			try {
				submissions = page_ids.map(value => value.submissions).flat()
			} catch (e) {
				console.log(e, "Dasdsadsasad")
				res.status(400).send({
					error: e,
					status: 400
				})
				return
			}
		}

		const return_data = {
			cursor: 0,
			data: submissions
		}

		res.status(200).send(return_data)
	}

	getTotalEarned = async (req: Request, res: Response) => {
		const total_earned = await prisma.submission.aggregate({
			_sum: {
				total_prices: true
			},
			where: {
				page: {
					userId: res.locals.user.id
				}
			}
		})

		if(!total_earned) {
			res.status(400).send({
				error: "Can't calculate",
				status: 400
			})
			return
		}

		res.status(200).send(total_earned)
	}

	post = async (req: Request, res: Response) => {
		let submissionData = req.body

		var submission
		try {
			submission = await prisma.submission.create({
				data: {
					...submissionData
				},
				include: {
					page: {
						include: {
							user: true
						}
					}
				},
			})
		} catch (e) {
			console.log(e)
			res.status(400).send({
				error: e,
				status: 400
			})
			return
		}

		if(submission.pagesId && submission.page) {
			send_webhook_data(submission.pagesId, {
				"embeds": [
					{
					  "title": `$${submission.total_prices} Payment Received from ${submission.email} to ${submission.currency === 'solana' ? submission.page.sol_address : submission.page.eth_address}`,
					  "description": `Your store - ${submission.page.title} received payment \n\n You can check transaction here - ${submission.currency === 'solana' ? `https://solscan.io/tx/${submission.transaction_hash}` : `https://etherscan.io/tx/${submission.transaction_hash}`}`,
					  "color": 5814783
					}
				]
			})

			send_email(submission.pagesId, {
				to: submission.page.user.email as string,
				from: 'hello@bayze.in',
				subject: `$${submission.total_prices} Payment Received from ${submission.email} to ${submission.currency === 'solana' ? submission.page.sol_address : submission.page.eth_address}`,
				text: `Your store - ${submission.page.title} received payment \n\n You can check transaction here - ${submission.currency === 'solana' ? `https://solscan.io/tx/${submission.transaction_hash}` : `https://etherscan.io/tx/${submission.transaction_hash}`}`
			})
		} else {
			
		}


		res.status(201).send(submission)
	}

	batch = async (req: Request, res: Response) => {
		const pageData: Prisma.Enumerable<Prisma.SubmissionCreateManyInput> = req.body

		var submissions

		try {
			submissions = await prisma.submission.createMany({
				data: pageData
			})
		} catch (e) {
			res.status(400).send({
				error: e,
				status: 400
			})
			return
		}

		res.status(201).send(submissions)
	}

	update = async (req: Request, res: Response) => {
		const { id, ...submissionData } = req.body

		var submission
		try {
			submission = await prisma.submission.update({
				where: {
					id: id
				},
				data: submissionData
			})
		} catch (e) {
			res.status(400).send({
				error: e,
				status: 400
			})
			return
		}

		res.status(200).send(submission)
	}

	delete = async (req: Request, res: Response) => {
		const { id } = req.query
		var submission

		try {
			submission = await prisma.submission.delete({
				where: {
					id: Number(id)
				}
			})
		} catch (e) {
			res.status(400).send({
				error: e,
				status: 400
			})
			return
		}

		res.status(204).send(submission)
	}
}

export default SubmissionController