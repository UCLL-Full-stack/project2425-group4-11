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
            lastName: 'Liefsoens',
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
    
    const event1 = await prisma.event.create({
        data: {
            title: 'ACDC - ON TOUR',
            genre: 'Rock',
            time: '20:00',
            date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            duration: 60,
            description: 'a new band who are performing live for the first time',
            status: 'Past',
        }
    });    
    
    const ticket1 = await prisma.ticket.create({
        data: {
            type: 'Regular',
            status: 'Available',
            price: 300,
            event: {
                connect: { id: event1.id }
            },
        }
    });  
    
    const event2 = await prisma.event.create({
        data: {
            title: 'Taylor Swift - Lover Tour',
            genre: 'Pop',
            time: '20:00',
            date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            duration: 120,
            description: 'Taylor swift errors tour comes to visit',
            status: 'Upcoming',
        }
    });
  
    const ticket2 = await prisma.ticket.create({
        data: {
            type: 'Student',
            status: 'Available',
            price: 20,
            event: {
                connect: { id: event2.id }
            }
        }
    })
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