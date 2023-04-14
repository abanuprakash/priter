import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const query = req.query;
        const { id } = query;

        if (id === undefined || id === '') {
            res.status(417).json({ message: "Invalid Id" });
            return;
        }

        try {
            const response = await prisma.pr_story_paragraph.findUnique({
                where: {
                    id: +id!,
                },
                include: {
                    childParagraphs: true,
                }
            });

            if (response?.parentId !== 0) {
                res.status(417).json({ message: `No Story Available with this Id #${id}` });
            }

            if (response) {
                const childData = await prisma.pr_story_paragraph.findMany({
                    where: {
                        parentId: response.id
                    }
                });

                response.childParagraphs = childData;
                res.status(200).json(response);
            } else {
                res.status(417).json({ message: `No stroy for id #${id}` })
            }


        } catch (error) {
            res.status(500).json({ message: "Something went wrong" })
        }

    } else {
        res.status(405).json({ message: "Method not Allowed" });
    }

} 