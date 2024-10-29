import { User } from "../model/User";
import { Event } from "../model/Event";
import { Ticket } from "../model/Ticket";
import { ConcertHall } from "../model/ConcertHall";
import { Artist } from "../model/Artist";

const user = new User({
    id: 1,
    email: 'john.doe@example.com',
    password: 'password123',
    firstName: 'john',
    lastName: 'doe',
    phoneNumber: '0489342809',
    accountStatus: true, 
});

const event = new Event ({
    id: 1,
    genre: 'pop',
    time: '18:00',
    date: new Date('2023-10-01'),
    duration: 60,
    description: 'concert',
    status: 'Ongoing',
});

const ticket = new Ticket({
    id: 1,
    type: 'VIP',
    status: true,
    price: 50,
    seat: 'A1',
    date: new Date('2023-10-01'),
})

const concertHall = new ConcertHall({
    id:1,
    location: 'Leuven',
    capacity: 500,
    name: 'Depot',
    facilities: ['bar', 'toilet'],
    contactInfo: {
        email: '',
        number: '0489342809',
        instagram: 'depot',
    },
})

const artist = new Artist({
    id: 1,
    artistName: 'Shawn Mendes',
    genre: ['pop','r&b'],
    biography: 'Shawn Mendes is a talented pop artist',
    bookingFee: 1000,
    socialMedia: ['instagram', 'twitter'],
})
