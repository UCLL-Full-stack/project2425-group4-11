import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.event.deleteMany();

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

    const samip1 = await prisma.user.create({
        data: {
            email: 'samip@showtime.com',
            password: await bcrypt.hash('samip123', 12),
            firstName: 'Samip',
            lastName: 'Shrestha',
            username: 'samipsamip',
            phoneNumber: '0489007570',
            accountStatus: true,
            role: 'user',
        },
    });   
    
    const artist1 = await prisma.artist.create({
        data:{
            artistName: 'Big johny' ,
            password: await bcrypt.hash('artist123', 12),
            genres: ['Jazz','Country'],
            biography: '50 year old pedo who loves music ',
            bookingFee: 1000,
            socialMedia: ['https://www.instagram.com/'],
            email: 'bigjohny@gmail.com',
            isVerified: "Pending",
            role: 'artist',
        }
    })

    const artist2 = await prisma.artist.create({
        data:{
            artistName: 'KSI' ,
            password: await bcrypt.hash('help123', 12),
            genres: ['UK RAP'],
            biography: 'Youtuber turned musician. ',
            bookingFee: 100000,
            socialMedia: ['https://www.instagram.com/'],
            email: 'ksi@gmail.com',
            isVerified: "Pending",
            role: 'artist',
        }
    })

    const taylorSwift = await prisma.artist.create({
        data:{
            artistName: 'Taylor Swift' ,
            password: await bcrypt.hash('taylor123', 12),
            genres: ['pop'],
            biography: 'Taylor',
            bookingFee: 100000,
            socialMedia: ['https://www.instagram.com/'],
            email: 'taylor.swift@gmail.com',
            isVerified: "Verified",
            role: 'artist',
        }
    });
    const concertHall1 = await prisma.concertHall.create({
        data: {
            location: '123 Main St, Cityville',
            capacity: 5000,
            name: 'Cityville Concert Hall',
            facilities: ['Parking', 'Restrooms', 'VIP Lounge'],
            contactInfo: ['0489342309', 'contact@cityvillehall.com','https://www.instagram.com/cityvillehall'],
            isVerified: 'Verified',
            username: 'cityville',
            password: await bcrypt.hash('cityville123', 12),
            role: 'concertHall',
        },
    });

    const concertHall2 = await prisma.concertHall.create({
        data: {
            location: '456 Elm St, Townsville',
            capacity: 3000,
            name: 'Townsville Concert Hall',
            facilities: ['Parking', 'Restrooms', 'Food Court'],
            contactInfo: ['987-654-3210', 'contact@townsvillehall.com', 'https://www.instagram.com/townsvillehall'],
            isVerified: 'Verified',
            username: 'townsville',
            password: await bcrypt.hash('townsville123', 12),
            role: 'concertHall'
        },
    });
    
    const event1 = await prisma.event.create({
        data: {
            title: 'ACDC - ON TOUR',
            genre: 'Rock',
            time: '20:00',
            date: new Date(new Date().setMonth(new Date().getMonth() + 5)),
            duration: 60,
            description: 'A new band who are performing live for the first time',
            status: 'Past',
            artist: {
                connect: {
                    id: artist2.id
                }
            },
            concertHall: {
                connect: { id: concertHall2.id }
            }
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
            user: {
                connect: { id: samip1.id}
            }
        }
    });  
    
    const event2 = await prisma.event.create({
        data: {
            title: 'Taylor Swift - Lover Tour',
            genre: 'Pop',
            time: '20:00',
            date: new Date(new Date().setMonth(new Date().getMonth() + 5)),
            duration: 120,
            description: 'Taylor Swift Eras Tour comes to visit',
            status: 'Upcoming',
            artist: {
                connect: {
                    id: taylorSwift.id
                },
            },
            concertHall: {
                connect: { id: concertHall1.id }
            }
        }
    });
  
    const ticket2 = await prisma.ticket.create({
        data: {
            type: 'Student',
            status: 'Available',
            price: 20,
            event: {
                connect: { id: event2.id }
            },
        }
    });

    console.log('Seeding completed!');
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
