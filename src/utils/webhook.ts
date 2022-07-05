import { prisma } from ".."
import fetch from "cross-fetch"
import sendgrid from "@sendgrid/mail"

sendgrid.setApiKey('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')

export const send_webhook_data = async (page_id: number, message: object) => {
	const page_data = await prisma.pages.findFirst({
		where: {
			id: page_id
		},
		select: {
			webhook_urls: true
		}
	})
	const webhook_urls = page_data?.webhook_urls
	
	if(!webhook_urls) return

	webhook_urls.map(async url => {
		try {
			const data = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(message),
				headers: {
					'Content-Type': 'application/json'
				}
			})
	
			const res = await data.json()
	
			console.log(res)
		} catch(e) {
			console.log(e, url)
		}
	})
}

export const send_email = async (page_id: number, message: sendgrid.MailDataRequired) => {
	const mail = await sendgrid.send(message)
	console.log(mail)
}