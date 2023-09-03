import { Story } from "@/_types/story";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
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
                        _count: {
                            select: { childParagraphs: true },
                        }
                    }
                });
                if (response) {
                    console.log(response, 'response')
                    const data: any[] = [];
                    await response.map(async res => {
                        const childData = await prisma.story.findMany({
                            where: {
                                parentId: res.id
                            }
                        });

                        console.log(childData, 'chil')
                        // res.childParagraphs = childData;
                        data.push(res)
                    })
                    console.log(data, 'data')
                    res.status(200).json(response);
                } else {
                    res.status(417).json({ message: `No stroy for id #${id}` })
                }

                // res.status(200).json(response);
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