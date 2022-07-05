import type { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ResponseType } from '../types/ErrorType';
import { PrismaClient } from '@prisma/client';

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
	const prisma = new PrismaClient()
	
	var decoded: JwtPayload | string = ''
	try {
		const JWT_SECRET = '1733729e-3910-4637-88c1-6fad57d04f26'
		const access_token = req.headers['bearer-token'] as string
		decoded = jwt.verify(access_token, JWT_SECRET);
	} catch (e) {
		let error: ResponseType = {
			error: e,
			status: 401
		}

		res.status(401).send(error)
		return
	}

	const user = await prisma.user.findFirst({
		where: {
			email: (decoded as JwtPayload).email
		}
	})
	console.log(user, decoded)
	
	res.locals.user = user

	next()
}

export default verifyUser
