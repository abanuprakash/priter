import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const query = req.query;
        const { id } = query;

        if (id) {
            try {
                const response = await prisma.pr_story_paragraph.findMany({
                    where: {
                        parentId: +id,
                    }
                });

                res.status(200).json(response);
            } catch (error) {
                res.status(417).json(error)
            }
        } else {
            res.status(417).json({ message: "Invalid id" })
        }


    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}