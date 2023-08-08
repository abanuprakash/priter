import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const initialSeedData: Prisma.UserCreateInput[] = [
    {
        id: 'guestuser001',
        name: "guest",
        email: "guest@guest.com",
    },
    {
        id: 'adminuser001',
        name: "admin",
        email: "admin@admin.com",
    }

]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of initialSeedData) {
        const user = await prisma.user.create({
            data: u,
        })
        console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })