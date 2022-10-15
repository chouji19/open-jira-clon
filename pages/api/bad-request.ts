// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	message: string | string[];
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { message = 'Bad request' } = req.body;
	console.log(req.body);
	res.status(400).json({ message })
}
