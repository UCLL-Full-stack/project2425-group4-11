import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.deleteMany();

    const admin = await prisma.user.create({
        data: {
            email: 'admin@showtime.com',
            password: await bcrypt.hash('admin123', 12),
            firstName: 'Admin',
            lastName: 'Admin',
            username: 'admin',
            phoneNumber: '0489007570',
            accountStatus: true,
            role: 'admin',
        },
    });

    const emma = await prisma.user.create({
        data: {
            email: 'emma@showtime.com',
            password: await bcrypt.hash('emma123', 12),
            firstName: 'Emma',
            lastName: 'Liefsoen',
            username: 'emma',
            phoneNumber: '0489007571',
            accountStatus: true,
            role: 'admin',
        },
    });

    const samip = await prisma.user.create({
        data: {
            email: 'samip@showtime.com',
            password: await bcrypt.hash('samip123', 12),
            firstName: 'Samip',
            lastName: 'Shrestha',
            username: 'samip',
            phoneNumber: '0489007570',
            accountStatus: true,
            role: 'admin',
        },
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();