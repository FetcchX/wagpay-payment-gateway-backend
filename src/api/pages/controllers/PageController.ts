import { Request, Response } from "express";
import { Pages, Prisma, PrismaClient } from '@prisma/client'
// import fetch, { BodyInit } from "node-fetch";
import { prisma } from "../../../index";

function isNumeric(str: any) {
	if (typeof str != "string") return false // we only process strings!  
	// @ts-ignore
	return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		   !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
  

class PageController {
	get = async (req: Request, res: Response) => {
		const data = {} as any
		Object.keys(req.query).map(value => {if(isNumeric(req.query[value]) && value !== 'cursor') data[value] = Number(req.query[value])})
		
		let db_query = {
			userId: res.locals.user.id,
			...data
		}

		var pages = []
		
		try {
			pages = await prisma.pages.findMany({
				take: 20,
				skip: 1,
				cursor: {
					id: Number(req.query.cursor)
				},
				where: db_query,
				orderBy: {
					created_at: 'desc'
				}
			})
		} catch (e) {
			pages = await prisma.pages.findMany({
				take: 20,
				where: db_query,
				orderBy: {
					created_at: 'desc'
				}
			})
		}

		const return_data = {
			data: pages,
			cursor: 0
		}

		res.status(200).send(return_data)
	}

	getTotalVisits = async (req: Request, res: Response) => {
		const visits = await prisma.pages.aggregate({
			_sum: {
				visits: true
			},
			where: {
				userId: res.locals.user.id
			}
		})

		if(!visits) {
			res.status(400).send({
				error: "You don't have any stores",
				status: 400
			})
			return
		}

		res.status(200).send(visits)
	}

	getFromSlug = async (req: Request, res: Response) => {
		let { slug, username } = req.query
		
		var page

		try {
			page = await prisma.pages.findFirst({
				include: {
					products: true
				},
				where: {
					user: {
						username: username as string
					},
					slug: slug as string
				}
			})

			console.log(page)
		} catch(e) {
			console.log(e)
			res.status(400).send({
				error: e,
				status: 401
			})
			return
		}

		console.log(page)
		res.status(200).send(page)
	}

	post = async (req: Request, res: Response) => {
		let { products, ...pageData } = req.body
		
		pageData.userId = res.locals.user.id
		
		for(let i = 0; i < products.create.length; i++) {
			products.create[i].userId = res.locals.user.id
			console.log(products.create[i].userId, "user")
		}
		pageData.products = products
		
		if(!pageData.eth_address) pageData.eth_address = res.locals.user.eth_address
		if(!pageData.sol_address) pageData.sol_address = res.locals.user.sol_address

		try {
			const slug = await prisma.pages.findFirst({
				where: {
					userId: res.locals.user.id,
					slug: pageData.slug
				}
			})
			console.log(slug, pageData.slug, "SLUG")
			if(slug) {
				res.status(400).send({ error: 'Store already exists with that slug', status: 400 })
				return
			}
		} catch (e) {}

		var page
		try {
			page = await prisma.pages.create({
				data: pageData
			})
		} catch (e) {
			console.log(e)
			res.status(400).send({
				error: e,
				status: 400
			})
			return
		}

		res.status(201).send(page)
	}

	batch = async (req: Request, res: Response) => {
		const pageData: Prisma.Enumerable<Prisma.PagesCreateManyInput> = req.body

		var pages

		try {
			pages = await prisma.pages.createMany({
				data: pageData
			})
		} catch (e) {
			res.status(400).send({
				error: e,
				status: 400
			})
			return
		}

		res.status(201).send(pages)
	}

	update = async (req: Request, res: Response) => {
		const { id, ...pageData } = req.body

		if(Object.keys(pageData).includes('slug')) {
			try {
				const slug = await prisma.pages.findFirst({
					where: {
						userId: res.locals.user.id,
						slug: pageData.slug
					}
				})
				if(slug) {
					res.status(400).send({ error: 'Store already exists with that slug', status: 400 })
					return
				}
			} catch (e) {}
		}

		var page
		try {
			page = await prisma.pages.update({
				where: {
					id: id
				},
				data: pageData
			})
		} catch (e) {
			res.status(400).send({
				error: e,
				status: 400
			})
			return
		}

		res.status(200).send(page)
	}

	delete = async (req: Request, res: Response) => {
		const { id } = req.query
		var page

		try {
			page = await prisma.pages.delete({
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

		res.status(204).send(page)
	}
}

export default PageController
