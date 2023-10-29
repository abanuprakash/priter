import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]"

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if (req.method === 'POST') {

        if (session?.user?.email) {
            const user = await prisma.user.findUnique({
                where: {
                    email: session?.user?.email,
                }
            })

            req.body.crtBy = user?.name ?? 'guest';
            req.body.userId = user?.id ?? 'guestuser001';
            req.body.updBy = user?.name ?? 'guest';
            req.body.userImage = user?.image ?? ''
        } else {
            req.body.crtBy = 'guest';
            req.body.updBy = 'guest';
            req.body.userId = "guestuser001";
            req.body.userImage = '';
        }

        if (req.body.lastAuthor === req.body.crtBy && req.body.parentId === 2) {
            res.status(417).json({ message: "ooh hoo Sorry! You can't put consecutive entries" });
            res.end();
        } else {
            delete req.body["lastAuthor"];

            try {
                const result = await prisma.story.create({ data: req.body });

                res.status(200).json(result);

            } catch (error) {
                res.status(500).json({ message: "Something Went Wrong" });
            }


        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }

}