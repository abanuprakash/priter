import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const newParagraph = {
        paragraph: "testing a new children story to check if al working fine",
        crtBy: "admin",
        updBy: "admin",
        parentId: 1,
        userId: 1
    }
    if (req.method === 'POST') {

        try {
            const result = await prisma.pr_story_paragraph.create({ data: newParagraph });
            
            res.status(200).json(result);

        } catch (error) {
            console.log("error", error)
            res.status(500).json({ message: "Something Went Wrong" });
        }

    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }

}