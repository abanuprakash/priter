import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {

        try {
            const result = await prisma.story.findMany({
                where: {
                    parentId: 0
                },
                // include: {
                //     childParagraphs: false,
                // }
            });

            res.status(200).json(result);
            
        } catch (error) {
            res.status(500).json({ message: "Something Went Wrong" });
        }

    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }

}