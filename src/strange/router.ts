import { ethers } from "ethers"
import express, { Request, Response, Router } from "express"

import routes from "./routes.json"
import abi from "./abi.json"

export const strangeRouter = Router()

type fromToken = "ETH" | "MATIC"
type toToken = "ETH" | "USDCETH" | "USDTETH" | "MATIC"

strangeRouter.get('/:fromChain/:toChain/:amount', async (req: Request, res: Response) => {
	const fromChain = req.params['fromChain'] as fromToken
	const toChain = req.params['toChain'] as toToken
	const amount = req.params['amount'] as string

	if(fromChain === toChain) {
		res.status(400).send({
			error: "fromChain and toChain are the same",
			status: 400
		})
		return
	}

	const provider = new ethers.providers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/eqE3zeVND3stKdCjZdLOqU62A2jg6eJc")

	const _routes = routes.available_routes[fromChain][toChain]
	
	for(let i = 0; i < _routes.length; i++) {
		const route = _routes[i]
		const contract = new ethers.Contract(route.contract, abi, provider)
		
		const fee = await contract.getTransferFee(route.tokenAddress, Number(amount))
		console.log(`Fee for ${fromChain} <> ${toChain} -> `, fee)
		console.log('\n\n')
	}
	
	res.status(200).send(_routes)
})