import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {

        try {
            const result = await prisma.user.findMany({
                include: {
                    story: true
                }
            });
            
            res.status(200).json(result);

        } catch (error) {
            res.status(500).json({ message: "Something Went Wrong" });
        }

    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}