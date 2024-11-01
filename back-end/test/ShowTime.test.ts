import { addDays, set, setDate, setMonth } from 'date-fns';
import { User } from "../model/User";
import { Event } from "../model/Event";
import { Ticket } from "../model/Ticket";
import { ConcertHall } from "../model/ConcertHall";
import { Artist } from "../model/Artist";

const event = new Event({
        genre: 'rock',
        time: '20:00',
        date: new Date('2024-12-02'),
        duration: 90,
        description: 'rock concert',
        status: 'Upcoming',
    });

const user = new User({
    id: 1,
    email: 'john.doe@example.com',
    password: 'password123',
    firstName: 'john',
    lastName: 'doe',
    phoneNumber: '0489342809',
    accountStatus: true, 
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
    const now = new Date();
    const eventDate = new Date();
    eventDate.setMonth(now.getMonth() + 1);

    //when
    const newEvent = new Event({
        genre: 'rock',
        time: '20:00',
        date: eventDate,
        duration: 90,
        description: 'rock concert',
        status: 'Upcoming',
    });

    // then
    expect(newEvent.getGenre()).toEqual('rock');
    expect(newEvent.getTime()).toEqual('20:00');
    expect(newEvent.getDate().getTime()).toEqual(eventDate.getTime());
    expect(newEvent.getDuration()).toEqual(90);
    expect(newEvent.getDescription()).toEqual('rock concert');
    expect(newEvent.getStatus()).toEqual('Upcoming');
});

test('given: empty genre, when: event is created, then: an error is thrown', () => {
    // given

    //when
    const createEvent = () => new Event({
        genre: '    ',
        time: '20:00',
        date: new Date('2024-12-02'),
        duration: 90,
        description: 'rock concert',
        status: 'Upcoming',
    });

    // then
    expect(createEvent).toThrow('Genre cannot be empty.');
});

test('given: invalid time format, when: event is created, then: an error is thrown', () => {
    // given

    // when
    const createEvent = () => new Event({
        genre: 'rock',
        time: '25:020', // Invalid time format
        date: new Date('2024-12-02'),
        duration: 90,
        description: 'rock concert',
        status: 'Upcoming',
    });

    // then
    expect(createEvent).toThrow("Time must be in the format 'HH:MM'.");
});

test('given: invalid time format, when: event is created, then: an error is thrown', () => {

    // given

    // when
    const createEvent = () => new Event({
        genre: 'rock',
        time: '25:00', // Invalid time format
        date: new Date('2024-12-02'),
        duration: 90,
        description: 'rock concert',
        status: 'Upcoming',
    });

    // then
    expect(createEvent).toThrow("Invalid time provided.");
});

test('given: invalid time format, when: event is created, then: an error is thrown', () => {
    // given

    // when
    const createEvent = () => new Event({
        genre: 'rock',
        time: '19:79', // Invalid time format
        date: new Date('2024-12-02'),
        duration: 90,
        description: 'rock concert',
        status: 'Upcoming',
    });

    // then
    expect(createEvent).toThrow("Invalid time provided.");
});

test('given: invalid time format, when: event is created, then: an error is thrown', () => {
    // given

    // when
    const createEvent = () => new Event({
        genre: 'rock',
        time: 'rt:00', // Invalid time format
        date: new Date('2024-12-02'),
        duration: 90,
        description: 'rock concert',
        status: 'Upcoming',
    })

    //then
    expect(createEvent).toThrow("Time must be in the format 'HH:MM'.");
});

test('given: end date is before start date, when: event is created, then: an error is thrown', () => {
    // given
    const invalidEndDate = addDays(new Date(), 15);

    // when
    const createEvent = () => new Event({
        id: 3,
        genre: 'jazz',
        time: '19:00',
        date: invalidEndDate,
        duration: 120,
        description: 'jazz concert',
        status: 'Upcoming',
    });

    // then
    expect(createEvent).toThrow('Event date must be at least one month in the future.');
});

test('given: negative duration, when: event is created, then: an error is thrown', () => {
    // given

    // when
    const createEvent = () => new Event({
        genre: 'rock',
        time: '20:00',
        date: new Date('2024-12-02'),
        duration: -5, // Negative duration
        description: 'rock concert',
        status: 'Upcoming',
    });

    // then
    expect(createEvent).toThrow('Duration must be a positive number.');
});

test('given: zero duration, when: event is created, then: an error is thrown', () => {
    // given

    // when
    const createEvent = () => new Event({
        genre: 'rock',
        time: '20:00',
        date: new Date('2024-12-02'),
        duration: 0, // Zero duration
        description: 'rock concert',
        status: 'Upcoming',
    });

    // then
    expect(createEvent).toThrow('Duration must be a positive number.');
});

test('given: empty description, when: event is created, then: an error is thrown', () => {
    // given

    // when
    const createEvent = () => new Event({
        genre: 'rock',
        time: '20:00',
        date: new Date('2024-12-02'),
        duration: 90,
        description: '', // Empty description
        status: 'Upcoming',
    });

    // then
    expect(createEvent).toThrow('Description cannot be empty.');
});

test('given: invalid status, when: event is created, then: an error is thrown', () => {
    // given

    // when
    const createEvent = () => new Event({
        genre: 'rock',
        time: '20:00',
        date: new Date('2024-12-02'),
        duration: 90,
        description: 'rock concert',
        status: 'Scheduled', // Invalid status
    });

    // then
    expect(createEvent).toThrow('Invalid event status. Allowed statuses are: Upcoming, Ongoing, Past.');
});

test('given: invalid status, when: status is updated, then: an error is thrown', () => {
    // given

    // when
    const updateEventStatus = () => {
        event.setStatus('Scheduled')
    }

    // then
    expect(updateEventStatus).toThrow("Invalid event status. Allowed statuses are: Upcoming, Ongoing, Past.");
});

test('given: invalid description, when: description is updated, then: an error is thrown', () => {
    // given


    // when
    const updateEventDescription = () => {
        event.setDescription('   ')
    }

    // then
    expect(updateEventDescription).toThrow("Description cannot be empty.");
});