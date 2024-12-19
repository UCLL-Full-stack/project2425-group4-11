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

    const edSheeran = await prisma.artist.create({
        data:{
            artistName: 'Ed Sheeran' ,
            password: await bcrypt.hash('ed123', 12),
            genres: ['pop', 'folk'],
            biography: 'Ed',
            bookingFee: 150000,
            socialMedia: ['https://www.instagram.com/edsheeran/'],
            email: 'ed.sheeran@gmail.com',
            isVerified: "Verified",
            role: 'artist',
        }
    });
    
    const adele = await prisma.artist.create({
        data:{
            artistName: 'Adele' ,
            password: await bcrypt.hash('adele123', 12),
            genres: ['pop', 'soul'],
            biography: 'Adele',
            bookingFee: 200000,
            socialMedia: ['https://www.instagram.com/adele/'],
            email: 'adele@gmail.com',
            isVerified: "Verified",
            role: 'artist',
        }
    });
    
    const brunoMars = await prisma.artist.create({
        data:{
            artistName: 'Bruno Mars' ,
            password: await bcrypt.hash('bruno123', 12),
            genres: ['pop', 'funk'],
            biography: 'Bruno',
            bookingFee: 180000,
            socialMedia: ['https://www.instagram.com/brunomars/'],
            email: 'bruno.mars@gmail.com',
            isVerified: "Verified",
            role: 'artist',
        }
    });

    const eminem = await prisma.artist.create({
        data:{
            artistName: 'Eminem' ,
            password: await bcrypt.hash('eminem123', 12),
            genres: ['hip-hop', 'rap'],
            biography: 'Eminem',
            bookingFee: 250000,
            socialMedia: ['https://www.instagram.com/eminem/'],
            email: 'eminem@gmail.com',
            isVerified: "Verified",
            role: 'artist',
        }
    });

    const beethoven = await prisma.artist.create({
        data:{
            artistName: 'Ludwig van Beethoven' ,
            password: await bcrypt.hash('beethoven123', 12),
            genres: ['classical'],
            biography: 'Beethoven',
            bookingFee: 300000,
            socialMedia: ['https://www.instagram.com/beethoven/'],
            email: 'beethoven@gmail.com',
            isVerified: "Verified",
            role: 'artist',
        }
    });

    const drake = await prisma.artist.create({
        data:{
            artistName: 'Drake' ,
            password: await bcrypt.hash('drake123', 12),
            genres: ['hip-hop', 'rap'],
            biography: 'Drake',
            bookingFee: 220000,
            socialMedia: ['https://www.instagram.com/champagnepapi/'],
            email: 'drake@gmail.com',
            isVerified: "Verified",
            role: 'artist',
        }
    });
    
    const arianaGrande = await prisma.artist.create({
        data:{
            artistName: 'Ariana Grande' ,
            password: await bcrypt.hash('ariana123', 12),
            genres: ['pop', 'r&b'],
            biography: 'Ariana',
            bookingFee: 210000,
            socialMedia: ['https://www.instagram.com/arianagrande/'],
            email: 'ariana.grande@gmail.com',
            isVerified: "Verified",
            role: 'artist',
        }
    });

    const artistColdplay = await prisma.artist.create({
        data: {
            artistName: 'Coldplay',
            password: await bcrypt.hash('coldplay123', 12),
            genres: ['Alternative Rock'],
            biography: 'Coldplay is a British rock band formed in London in 1996.',
            bookingFee: 500000,
            socialMedia: ['https://www.instagram.com/coldplay/'],
            email: 'coldplay@gmail.com',
            isVerified: "Verified",
            role: 'artist',
        }
    });
    
    const artistBillieEilish = await prisma.artist.create({
        data: {
            artistName: 'Billie Eilish',
            password: await bcrypt.hash('billie123', 12),
            genres: ['Pop'],
            biography: 'Billie Eilish is an American singer and songwriter.',
            bookingFee: 400000,
            socialMedia: ['https://www.instagram.com/billieeilish/'],
            email: 'billie.eilish@gmail.com',
            isVerified: "Verified",
            role: 'artist',
        }
    });
    
    const artistTheWeeknd = await prisma.artist.create({
        data: {
            artistName: 'The Weeknd',
            password: await bcrypt.hash('weeknd123', 12),
            genres: ['R&B', 'Pop'],
            biography: 'The Weeknd is a Canadian singer, songwriter, and record producer.',
            bookingFee: 450000,
            socialMedia: ['https://www.instagram.com/theweeknd/'],
            email: 'the.weeknd@gmail.com',
            isVerified: "Verified",
            role: 'artist',
        }
    });

    const eventColdplay = await prisma.event.create({
        data: {
            title: 'Coldplay - Music of the Spheres Tour',
            genre: 'Alternative Rock',
            time: '19:30',
            date: new Date(new Date().setMonth(new Date().getMonth() + 4)),
            duration: 120,
            description: 'Coldplay performing live',
            status: 'Upcoming',
            artist: {
                connect: {
                    id: artistColdplay.id
                }
            },
            concertHall: {
                connect: { id: concertHall1.id }
            }
        }
    });
    
    const eventBillieEilish = await prisma.event.create({
        data: {
            title: 'Billie Eilish - Happier Than Ever Tour',
            genre: 'Pop',
            time: '20:00',
            date: new Date(new Date().setMonth(new Date().getMonth() + 5)),
            duration: 90,
            description: 'Billie Eilish performing live',
            status: 'Upcoming',
            artist: {
                connect: {
                    id: artistBillieEilish.id
                }
            },
            concertHall: {
                connect: { id: concertHall2.id }
            }
        }
    });
    
    const eventTheWeeknd = await prisma.event.create({
        data: {
            title: 'The Weeknd - After Hours Tour',
            genre: 'R&B, Pop',
            time: '21:00',
            date: new Date(new Date().setMonth(new Date().getMonth() + 6)),
            duration: 100,
            description: 'The Weeknd performing live',
            status: 'Upcoming',
            artist: {
                connect: {
                    id: artistTheWeeknd.id
                }
            },
            concertHall: {
                connect: { id: concertHall1.id }
            }
        }
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
    

    
    const eventEdSheeran = await prisma.event.create({
        data: {
            title: 'Ed Sheeran - Divide Tour',
            genre: 'Pop, Folk',
            time: '19:00',
            date: new Date(new Date().setMonth(new Date().getMonth() + 6)),
            duration: 90,
            description: 'Ed Sheeran performing live',
            status: 'Upcoming',
            artist: {
                connect: {
                    id: edSheeran.id
                }
            },
            concertHall: {
                connect: { id: concertHall2.id }
            }
        }
    });
    
    const eventAdele = await prisma.event.create({
        data: {
            title: 'Adele - 30 Tour',
            genre: 'Pop, Soul',
            time: '21:00',
            date: new Date(new Date().setMonth(new Date().getMonth() + 7)),
            duration: 100,
            description: 'Adele performing her latest hits',
            status: 'Upcoming',
            artist: {
                connect: {
                    id: adele.id
                }
            },
            concertHall: {
                connect: { id: concertHall1.id }
            }
        }
    });
    
    const eventBrunoMars = await prisma.event.create({
        data: {
            title: 'Bruno Mars - 24K Magic Tour',
            genre: 'Pop, Funk',
            time: '20:30',
            date: new Date(new Date().setMonth(new Date().getMonth() + 8)),
            duration: 110,
            description: 'Bruno Mars live in concert',
            status: 'Upcoming',
            artist: {
                connect: {
                    id: brunoMars.id
                }
            },
            concertHall: {
                connect: { id: concertHall2.id }
            }
        }
    });
    
    const eventEminem = await prisma.event.create({
        data: {
            title: 'Eminem - Revival Tour',
            genre: 'Hip-Hop, Rap',
            time: '22:00',
            date: new Date(new Date().setMonth(new Date().getMonth() + 9)),
            duration: 130,
            description: 'Eminem performing live',
            status: 'Upcoming',
            artist: {
                connect: {
                    id: eminem.id
                }
            },
            concertHall: {
                connect: { id: concertHall1.id }
            }
        }
    });
    
    const eventBeethoven = await prisma.event.create({
        data: {
            title: 'Beethoven - Symphony No. 9',
            genre: 'Classical',
            time: '18:00',
            date: new Date(new Date().setMonth(new Date().getMonth() + 10)),
            duration: 150,
            description: 'Beethoven\'s Symphony No. 9 performed live',
            status: 'Upcoming',
            artist: {
                connect: {
                    id: beethoven.id
                }
            },
            concertHall: {
                connect: { id: concertHall2.id }
            }
        }
    });
    
    const eventDrake = await prisma.event.create({
        data: {
            title: 'Drake - Scorpion Tour',
            genre: 'Hip-Hop, Rap',
            time: '21:30',
            date: new Date(new Date().setMonth(new Date().getMonth() + 11)),
            duration: 120,
            description: 'Drake performing live',
            status: 'Upcoming',
            artist: {
                connect: {
                    id: drake.id
                }
            },
            concertHall: {
                connect: { id: concertHall1.id }
            }
        }
    });
    
    const eventArianaGrande = await prisma.event.create({
        data: {
            title: 'Ariana Grande - Sweetener Tour',
            genre: 'Pop, R&B',
            time: '20:00',
            date: new Date(new Date().setMonth(new Date().getMonth() + 12)),
            duration: 110,
            description: 'Ariana Grande performing live',
            status: 'Upcoming',
            artist: {
                connect: {
                    id: arianaGrande.id
                }
            },
            concertHall: {
                connect: { id: concertHall2.id }
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

    const ticket3 = await prisma.ticket.create({
        data: {
            type: 'VIP',
            status: 'Available',
            price: 500,
            event: {
                connect: { id: eventAdele.id }
            },
        }
    });
    
    const ticket4 = await prisma.ticket.create({
        data: {
            type: 'Regular',
            status: 'Sold',
            price: 300,
            event: {
                connect: { id: eventBrunoMars.id }
            },
        }
    });
    
    const ticket5 = await prisma.ticket.create({
        data: {
            type: 'VIP',
            status: 'Sold',
            price: 500,
            event: {
                connect: { id: eventEminem.id }
            },
        }
    });
    
    const ticket6 = await prisma.ticket.create({
        data: {
            type: 'Regular',
            status: 'Available',
            price: 250,
            event: {
                connect: { id: eventBeethoven.id }
            },
        }
    });
    
    const ticket7 = await prisma.ticket.create({
        data: {
            type: 'Student',
            status: 'Available',
            price: 15,
            event: {
                connect: { id: eventDrake.id }
            },
        }
    });
    
    const ticket8 = await prisma.ticket.create({
        data: {
            type: 'VIP',
            status: 'Available',
            price: 550,
            event: {
                connect: { id: eventArianaGrande.id }
            },
        }
    });
    
    const ticket9 = await prisma.ticket.create({
        data: {
            type: 'Regular',
            status: 'Sold',
            price: 280,
            event: {
                connect: { id: eventEdSheeran.id }
            },
        }
    });
    
    const ticket10 = await prisma.ticket.create({
        data: {
            type: 'VIP',
            status: 'Sold',
            price: 600,
            event: {
                connect: { id: eventEdSheeran.id }
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
