import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        console.log(req.body)

        try {
            const result = await prisma.story.create({ data: req.body });

            res.status(200).json(result);

        } catch (error) {
            console.log("error", error)
            res.status(500).json({ message: "Something Went Wrong" });
        }

    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }

}