// import { PrismaClient, Prisma } from '@prisma/client'

// const prisma = new PrismaClient()

// const initialSeedData: Prisma.pr_usersCreateInput[] = [
//     {
//         firstName: "admin",
//         email: "admin@admin.com",
//         mobile: "9876543210",
//         crtBy: "admin",
//         updBy: "admin",
//         paragraph: {
//             create: <Prisma.pr_story_paragraphCreateInput[]>[
//                 {
//                     paragraph: "testing a new story to check if al working fine",
//                     title: "testing the new story",
//                     crtBy: "admin",
//                     updBy: "admin"
//                 }
//             ]
//         }
//     },
//     {
//         firstName: "guest",
//         email: "guest@admin.com",
//         mobile: "9876543210",
//         crtBy: "guest",
//         updBy: "guest",
//         paragraph: {
//             create: <Prisma.pr_story_paragraphCreateInput[]>[
//                 {
//                     paragraph: "testing a new story to check if al working fine by guest",
//                     title: "testing the new story",
//                     crtBy: "guest",
//                     updBy: "guest"
//                 }
//             ]
//         }
//     }
// ]

// async function main() {
//     console.log(`Start seeding ...`)
//     for (const u of initialSeedData) {
//         const user = await prisma.pr_users.create({
//             data: u,
//         })
//         console.log(`Created user with id: ${user.userId}`)
//     }
//     console.log(`Seeding finished.`)
// }

// main()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })