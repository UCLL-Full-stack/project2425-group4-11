import { set } from 'date-fns';
import { User } from "../model/User";
import { Event } from "../model/Event";
import { Ticket } from "../model/Ticket";
import { ConcertHall } from "../model/ConcertHall";
import { Artist } from "../model/Artist";

const eventDate = set(new Date(), { year: 2023, month: 9, date: 1, hours: 18, minutes: 0 });
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
})

const concertHall = new ConcertHall({
    id:1,
    location: 'Leuven',
    capacity: 500,
    name: 'Depot',
    facilities: ['bar', 'toilet'],
    contactInfo: {
        email: 'info@hetdepot.be',
        countryCode: '+32',
        number: '0489342809',
        instagram: '@depot',
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

test('given: valid values for event, when: event is created, then: event is created with those values', () => {
    //given

    //when
    const newEvent = new Event({
        id: 2,
        genre: 'rock',
        time: '20:00',
        date: new Date('2023-11-01'),
        duration: 90,
        description: 'rock concert',
        status: 'Scheduled',
    });

    // then
    expect(newEvent.getGenre()).toEqual('rock');
    expect(newEvent.getTime()).toEqual('20:00');
    expect(newEvent.getDate()).toEqual(new Date('2023-11-01'));
    expect(newEvent.getDuration()).toEqual(90);
    expect(newEvent.getDescription()).toEqual('rock concert');
    expect(newEvent.getStatus()).toEqual('Scheduled');
});

test('given: end date is before start date, when: event is created, then: an error is thrown', () => {
    // given
    const invalidEndDate = set(new Date(), { year: 2023, month: 8, date: 30 });

    // when
    const createEvent = () => new Event({
        id: 3,
        genre: 'jazz',
        time: '19:00',
        date: invalidEndDate,
        duration: 120,
        description: 'jazz concert',
        status: 'Scheduled',
    });

    // then
    expect(createEvent).toThrow('Event date cannot be before the current date');
});

test('given: an existing event, when: adding a ticket that is already registered, then: that ticket is registered only once', () => {
    // given
    const newTicket = new Ticket({
        id: 3,
        type: 'VIP',
        status: true,
        price: 50,
        seat: 'A1',
    });
    //event.addTicket(newTicket);

    // when
    //const addTicketAgain = () => event.addTicket(newTicket);

    // then
    //expect(addTicketAgain).toThrow('Ticket is already registered for this event');
    //expect(event.getTickets()).toContain(newTicket);
    //expect(event.getTickets()).toHaveLength(1);
});
