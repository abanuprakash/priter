import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<any> {
    const handleChildData = (response: any[]) => {
        return response.map(res => {
            prisma.story.findMany({
                where: {
                    parentId: res.id
                },
                include: {
                    childParagraphs: true
                }
            }).then(resp => {
                res.childParagraphs = resp;
            });
        })
    }

    if (req.method === 'GET') {
        const query = req.query;
        const { id } = query;

        if (id) {
            try {
                const response = await prisma.story.findMany({
                    where: {
                        parentId: +id,
                    },
                    include: {
                        // childParagraphs: true,
                        _count: {
                            select: { childParagraphs: true },
                        }
                    }
                }).then(response => {
                    res.status(200).send(response);
                }).catch(error => res.status(417).json({ message: `No stroy for id #${id}` }));
            } catch (error) {
                res.status(417).json(error)
            }
        } else {
            res.status(417).json({ message: "Invalid id" });
        }


    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}