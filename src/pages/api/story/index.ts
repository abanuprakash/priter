import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {

        try {
            const result = await prisma.pr_story_paragraph.findMany({
                where: {
                    parentId: 0
                },
                // include: {
                //     childParagraphs: false,
                // }
            });

            // for (const data of result) {
            //     const childData = await prisma.pr_story_paragraph.findMany({
            //         where: {
            //             parentId: data.id
            //         }
            //     });
                
            //     data.childParagraphs = childData;
            // }

            res.status(200).json(result);
            
        } catch (error) {
            console.log("error", error)
            res.status(500).json({ message: "Something Went Wrong" });
        }

    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }

}