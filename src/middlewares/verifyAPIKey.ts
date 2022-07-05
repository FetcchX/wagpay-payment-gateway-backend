import { NextFunction, Request, Response } from "express";
import { prisma } from "..";

export const verifyAPIKey = async (req: Request, res: Response, next: NextFunction) => {
	const api_key = req.headers["api-key"]
	console.log(api_key, "api_key")
	
	if(!api_key) {
		res.status(400).send({
			error: "Please send api-key",
			status: 400
		})
		return
	}
	
	const user = await prisma.user.findUnique({
		where: {
			apiKey: api_key as string
		}
	})

	console.log(user)

	if(!user) {
		res.status(400).send({
			error: "Can't find User",
			status: 400
		})
		return
	}

	res.locals.user = user
	
	next()
}
