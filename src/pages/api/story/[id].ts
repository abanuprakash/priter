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
            const response = await prisma.story.findUnique({
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
                const childData = await prisma.story.findMany({
                    where: {
                        parentId: response.id
                    }
                });
                console.log(childData, 'childData in main')
                response.childParagraphs = childData;
                res.status(200).json(response);
            } else {
                res.status(417).json({ message: `No stroy for id #${id}` })
            }


        } catch (error) {
            res.status(500).json({ message: "Something went wrong" })
        }

    }
    else if (req.method === 'PUT') {
        const query = req.query;
        const { id } = query;

        try {
            const result = await prisma.story.update({
                where: {
                    id: +id!,
                },
                data: req.body
            });

            res.status(200).json(result);

        } catch (error) {
            console.log("error", error)
            res.status(500).json({ message: "Something Went Wrong" });
        }
    }
    else {
        res.status(405).json({ message: "Method not Allowed" });
    }

} 