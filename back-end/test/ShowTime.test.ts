import { addDays } from 'date-fns';
import { User } from "../model/User";
import { Event } from "../model/Event";
import { Ticket } from "../model/Ticket";
import { ConcertHall } from "../model/ConcertHall";
import { Artist } from "../model/Artist";

const now = new Date();
const eventDate = new Date();
eventDate.setMonth(now.getMonth() + 1);

const artist = new Artist({
    id: 1,
    artistName: 'Jeremy Zucker',
    password: 'jeremy123',
    genres: ['alt z', 'indie', 'alt rock', 'emo', 'blues'],
    biography: `Jeremy Zucker is an American singer-songwriter and producer known for his introspective, melancholic style blending pop, indie, and electronic music. Born in Franklin Lakes, New Jersey, in 1996, Zucker began making music in high school, experimenting with beats and lyrics in his bedroom studio. He gained recognition with his 2015 single "Bout It" and later achieved mainstream success with "Comethru" in 2018, a hit that resonated with fans worldwide for its candid reflection on loneliness and self-discovery. Zucker’s music often delves into themes of love, mental health, and personal growth, making him a relatable voice for many listeners. His sound, characterized by soft vocals layered over airy, acoustic beats, has led to collaborations with artists like Chelsea Cutler, blackbear, and Lauv. Jeremy’s debut album, Love Is Not Dying (2020), cemented his reputation as an artist unafraid to explore vulnerability through music.`,
    bookingFee: 1000,
    socialMedia: ['https://www.jeremyzuckermusic.com', 'https://www.instagram.com/jeremyzucker/'],
    email: 'jeremyzucker@showtime.com',
    isVerified: 'Verified',
    role: 'artist'
});

const concertHall = new ConcertHall({
    id: 1,
    location: 'street',
    capacity: 5000,
    name: 'concertHall',
    facilities: ['restroom', 'bar'],
    contactInfo: ['http://www.instagram.com/concertHall', 'concertHall@concertHall.com', '0481234567'],
    isVerified: 'Verified',
    username: 'concertHall',
    password: 'cocnertHall123',
    role: 'concertHall'
})

const event = new Event({
    id: 1,
    title: 'ACDC',
    genre: 'rock',
    time: '20:00',
    date: eventDate,
    duration: 90,
    description: 'rock concert',
    status: 'Upcoming',
    artistId: artist.getId() || 0,
    concertHallId: concertHall.getId() || 0
});

const user = new User({
    id:1,
    email: "user@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    username: 'johndoe',
    phoneNumber: "+1234567890",
    accountStatus: true,
    role: 'user'
})

const ticket = new Ticket({
    id: 1,
    type: 'Regular',
    status: 'Available',
    price: 25,
    eventId: event.getId() || 0,
    userId: null
})

// happy cases

    // event
    test('given: valid values for event, when: event is created, then: event is created with those values', () => {
        //given

        //when
        const newEvent = new Event({
            title: 'ACDC',
            genre: 'rock',
            time: '20:00',
            date: eventDate,
            duration: 90,
            description: 'rock concert',
            status: 'Upcoming',
            artistId: artist.getId() || 0,
            concertHallId: concertHall.getId() || 0
        });

        // then
        expect(newEvent.getGenre()).toEqual('rock');
        expect(newEvent.getTime()).toEqual('20:00');
        expect(newEvent.getDate().getTime()).toEqual(eventDate.getTime());
        expect(newEvent.getDuration()).toEqual(90);
        expect(newEvent.getDescription()).toEqual('rock concert');
        expect(newEvent.getStatus()).toEqual('Upcoming');
    });

    // artist
    test('given: valid values for artist, when: artist is created, then: artist is created with those values', () => {
        // given

        // when
        const newArtist = new Artist({
            artistName: 'Jeremy Zucker',
            password: 'jeremy123',
            genres: ['alt z', 'indie', 'alt rock', 'emo', 'blues'],
            biography: `Jeremy Zucker is an American singer-songwriter and producer known for his introspective, melancholic style blending pop, indie, and electronic music. Born in Franklin Lakes, New Jersey, in 1996, Zucker began making music in high school, experimenting with beats and lyrics in his bedroom studio. He gained recognition with his 2015 single "Bout It" and later achieved mainstream success with "Comethru" in 2018, a hit that resonated with fans worldwide for its candid reflection on loneliness and self-discovery. Zucker’s music often delves into themes of love, mental health, and personal growth, making him a relatable voice for many listeners. His sound, characterized by soft vocals layered over airy, acoustic beats, has led to collaborations with artists like Chelsea Cutler, blackbear, and Lauv. Jeremy’s debut album, Love Is Not Dying (2020), cemented his reputation as an artist unafraid to explore vulnerability through music.`,
            bookingFee: 1000,
            socialMedia: ['https://www.jeremyzuckermusic.com', 'https://www.instagram.com/jeremyzucker/'],
            email: 'jeremyzucker@showtime.com',
            isVerified: 'Verified',
            role: 'artist'
        });

        // then
        expect(newArtist.getArtistName()).toEqual('Jeremy Zucker');
        expect(newArtist.getGenres()).toEqual(['alt z', 'indie', 'alt rock', 'emo', 'blues']);
        expect(newArtist.getBiography()).toEqual(`Jeremy Zucker is an American singer-songwriter and producer known for his introspective, melancholic style blending pop, indie, and electronic music. Born in Franklin Lakes, New Jersey, in 1996, Zucker began making music in high school, experimenting with beats and lyrics in his bedroom studio. He gained recognition with his 2015 single "Bout It" and later achieved mainstream success with "Comethru" in 2018, a hit that resonated with fans worldwide for its candid reflection on loneliness and self-discovery. Zucker’s music often delves into themes of love, mental health, and personal growth, making him a relatable voice for many listeners. His sound, characterized by soft vocals layered over airy, acoustic beats, has led to collaborations with artists like Chelsea Cutler, blackbear, and Lauv. Jeremy’s debut album, Love Is Not Dying (2020), cemented his reputation as an artist unafraid to explore vulnerability through music.`);
        expect(newArtist.getBookingFee()).toEqual(1000);
        expect(newArtist.getSocialMedia()).toEqual(['https://www.jeremyzuckermusic.com', 'https://www.instagram.com/jeremyzucker/']);
    });

    // user
    test("given valid user details, when creating a user, then the user is created successfully", () => {
        // given

        // when
        const newUser = new User({
            email: "user@example.com",
            password: "password123",
            firstName: "John",
            lastName: "Doe",
            username: 'johndoe',
            phoneNumber: "+1234567890",
            accountStatus: true,
            role: 'user'
        });
        
        // then 
        expect(newUser.getEmail()).toEqual("user@example.com");
        expect(newUser.getPassword()).toEqual("password123");
        expect(newUser.getFirstName()).toEqual("John");
        expect(newUser.getLastName()).toEqual("Doe");
        expect(newUser.getPhoneNumber()).toEqual("+1234567890");
        expect(newUser.getAccountStatus()).toEqual(true);
    });

    // ticket
    test("given valid ticket details, when creating a ticket, then the ticket is created successfully", () => {
        // given

        // when
        const newTicket = new Ticket({
            type: "VIP",
            status: "Available",
            price: 100,
            eventId: event.getId() || 0,
            userId: user.getId() || 0
        });
        
        expect(newTicket.getType()).toEqual("VIP");
        expect(newTicket.getStatus()).toEqual("Available");
        expect(newTicket.getPrice()).toEqual(100);
    });

    // concert hall
    test("given valid concert hall details, when creating a concert hall, then the concert hall is created successfully", () => {
        // given

        // when
        const newConcertHall = new ConcertHall({
            location: "New York",
            capacity: 2000,
            name: "Madison Square Garden",
            facilities: ["WiFi", "Parking"],
            contactInfo: ['http://www.instagram.com/concertHall', 'concertHall@concertHall.com', '0481234567'],
            isVerified: 'Verified',
            username: 'concertHall',
            password: 'cocnertHall123',
            role: 'concertHall'
        });
        
        expect(newConcertHall.getLocation()).toEqual("New York");
        expect(newConcertHall.getCapacity()).toEqual(2000);
        expect(newConcertHall.getName()).toEqual("Madison Square Garden");
        expect(newConcertHall.getFacilities()).toEqual(["WiFi", "Parking"]);
        expect(newConcertHall.getContactInfo()).toEqual(['http://www.instagram.com/concertHall', 'concertHall@concertHall.com', '0481234567']);
    });

// unhappy cases

    // event
        // genre
        test('given: empty genre, when: event is created, then: an error is thrown', () => {
            // given

            //when
            const createEvent = () => new Event({
                title: 'ACDC',
                genre: '    ',
                time: '20:00',
                date: eventDate,
                duration: 90,
                description: 'rock concert',
                status: 'Upcoming',
                artistId: artist.getId() || 0,
                concertHallId: concertHall.getId() || 0
            });

            // then
            expect(createEvent).toThrow('Genre cannot be empty.');
        });

        // time
        test('given: invalid time format, when: event is created, then: an error is thrown', () => {
            // given

            // when
            const createEvent = () => new Event({
                title: 'ACDC',
                genre: 'rock',
                time: '25:020',
                date: eventDate,
                duration: 90,
                description: 'rock concert',
                status: 'Upcoming',
                artistId: artist.getId() || 0,
                concertHallId: concertHall.getId() || 0
            });

            // then
            expect(createEvent).toThrow("Time must be in the format 'HH:MM'.");
        });

        // time
        test('given: invalid time format, when: event is created, then: an error is thrown', () => {

            // given

            // when
            const createEvent = () => new Event({
                title: 'ACDC',
                genre: 'rock',
                time: '25:00',
                date: eventDate,
                duration: 90,
                description: 'rock concert',
                status: 'Upcoming',
                artistId: artist.getId() || 0,
                concertHallId: concertHall.getId() || 0
            });

            // then
            expect(createEvent).toThrow("Hours must be between 00 and 23.");
        });

        // time
        test('given: invalid time format, when: event is created, then: an error is thrown', () => {
            // given

            // when
            const createEvent = () => new Event({
                title: 'ACDC',
                genre: 'rock',
                time: '19:79',
                date: eventDate,
                duration: 90,
                description: 'rock concert',
                status: 'Upcoming',
                artistId: artist.getId() || 0,
                concertHallId: concertHall.getId() || 0
            });

            // then
            expect(createEvent).toThrow("Minutes must be between 00 and 59.");
        });

        // time
        test('given: invalid time format, when: event is created, then: an error is thrown', () => {
            // given

            // when
            const createEvent = () => new Event({
                title: 'ACDC',
                genre: 'rock',
                time: 'rt:00',
                date: eventDate,
                duration: 90,
                description: 'rock concert',
                status: 'Upcoming',
                artistId: artist.getId() || 0,
                concertHallId: concertHall.getId() || 0
            })

            //then
            expect(createEvent).toThrow("Time must be in the format 'HH:MM'.");
        });

        // date
        test('given: end date is before start date, when: event is created, then: an error is thrown', () => {
            // given
            const invalidEndDate = addDays(new Date(), 15);

            // when
            const createEvent = () => new Event({
                title: 'ACDC',
                genre: 'rock',
                time: '20:00',
                date: invalidEndDate,
                duration: 90,
                description: 'rock concert',
                status: 'Upcoming',
                artistId: artist.getId() || 0,
                concertHallId: concertHall.getId() || 0
            });

            // then
            expect(createEvent).toThrow('Event date must be at least one month in the future.');
        });

        // duration
        test('given: negative duration, when: event is created, then: an error is thrown', () => {
            // given

            // when
            const createEvent = () => new Event({
                title: 'ACDC',
                genre: 'rock',
                time: '20:00',
                date: eventDate,
                duration: -5,
                description: 'rock concert',
                status: 'Upcoming',
                artistId: artist.getId() || 0,
                concertHallId: concertHall.getId() || 0
            });

            // then
            expect(createEvent).toThrow('Duration must be a positive number.');
        });

        // duration
        test('given: zero duration, when: event is created, then: an error is thrown', () => {
            // given

            // when
            const createEvent = () => new Event({
                title: 'ACDC',
                genre: 'rock',
                time: '20:00',
                date: eventDate,
                duration: 0,
                description: 'rock concert',
                status: 'Upcoming',
                artistId: artist.getId() || 0,
                concertHallId: concertHall.getId() || 0
            });

            // then
            expect(createEvent).toThrow('Duration must be a positive number.');
        });

        // description
        test('given: empty description, when: event is created, then: an error is thrown', () => {
            // given

            // when
            const createEvent = () => new Event({
                title: 'ACDC',
                genre: 'rock',
                time: '20:00',
                date: eventDate,
                duration: 90,
                description: '',
                status: 'Upcoming',
                artistId: artist.getId() || 0,
                concertHallId: concertHall.getId() || 0
            });

            // then
            expect(createEvent).toThrow('Description cannot be empty.');
        });

        // status
        test('given: invalid status, when: event is created, then: an error is thrown', () => {
            // given

            // when
            const createEvent = () => new Event({
                title: 'ACDC',
                genre: 'rock',
                time: '20:00',
                date: eventDate,
                duration: 90,
                description: 'rock concert',
                status: 'Scheduled',
                artistId: artist.getId() || 0,
                concertHallId: concertHall.getId() || 0
            });

            // then
            expect(createEvent).toThrow('Invalid event status. Allowed statuses are: Upcoming, Ongoing, Past.');
        });

        // status
        test('given: invalid status, when: status is updated, then: an error is thrown', () => {
            // given

            // when
            const updateEventStatus = () => {
                event.setStatus('Scheduled')
            }

            // then
            expect(updateEventStatus).toThrow("Invalid event status. Allowed statuses are: Upcoming, Ongoing, Past.");
        });

        // description
        test('given: invalid description, when: description is updated, then: an error is thrown', () => {
            // given


            // when
            const updateEventDescription = () => {
                event.setDescription('   ')
            }

            // then
            expect(updateEventDescription).toThrow("Description cannot be empty.");
        });

    // artist
        // artist name
        test('given: empty artist name, when: artist is created, then: an error is thrown', () => {
            // given 

            // when
            const createArtist = () => new Artist({
                artistName: '',
                password: 'jeremy123',
                genres: ['alt z', 'indie', 'alt rock', 'emo', 'blues'],
                biography: `Jeremy Zucker is an American singer-songwriter and producer known for his introspective, melancholic style blending pop, indie, and electronic music. Born in Franklin Lakes, New Jersey, in 1996, Zucker began making music in high school, experimenting with beats and lyrics in his bedroom studio. He gained recognition with his 2015 single "Bout It" and later achieved mainstream success with "Comethru" in 2018, a hit that resonated with fans worldwide for its candid reflection on loneliness and self-discovery. Zucker’s music often delves into themes of love, mental health, and personal growth, making him a relatable voice for many listeners. His sound, characterized by soft vocals layered over airy, acoustic beats, has led to collaborations with artists like Chelsea Cutler, blackbear, and Lauv. Jeremy’s debut album, Love Is Not Dying (2020), cemented his reputation as an artist unafraid to explore vulnerability through music.`,
                bookingFee: 1000,
                socialMedia: ['https://www.jeremyzuckermusic.com', 'https://www.instagram.com/jeremyzucker/'],
                email: 'jeremyzucker@showtime.com',
                isVerified: 'Verified',
                role: 'artist'
            });

            // then
            expect(createArtist).toThrow('Artist name cannot be empty.');
        });

        // genres
        test('given: empty genres array, when: artist is created, then: an error is thrown', () => {
            // given

            // when
            const createArtist = () => new Artist({
                artistName: 'Jeremy Zucker',
                password: 'jeremy123',
                genres: [],
                biography: `Jeremy Zucker is an American singer-songwriter and producer known for his introspective, melancholic style blending pop, indie, and electronic music. Born in Franklin Lakes, New Jersey, in 1996, Zucker began making music in high school, experimenting with beats and lyrics in his bedroom studio. He gained recognition with his 2015 single "Bout It" and later achieved mainstream success with "Comethru" in 2018, a hit that resonated with fans worldwide for its candid reflection on loneliness and self-discovery. Zucker’s music often delves into themes of love, mental health, and personal growth, making him a relatable voice for many listeners. His sound, characterized by soft vocals layered over airy, acoustic beats, has led to collaborations with artists like Chelsea Cutler, blackbear, and Lauv. Jeremy’s debut album, Love Is Not Dying (2020), cemented his reputation as an artist unafraid to explore vulnerability through music.`,
                bookingFee: 1000,
                socialMedia: ['https://www.jeremyzuckermusic.com', 'https://www.instagram.com/jeremyzucker/'],
                email: 'jeremyzucker@showtime.com',
                isVerified: 'Verified',
                role: 'artist'
            });

            // then
            expect(createArtist).toThrow('Artist must have at least one genre.');
        });

        // genres
        test('given: empty genre string, when: genre is added, then: an error is thrown', () => {
            // given

            // when
            const addGenre = () => {
                artist.setGenre('');
            }
 
            expect(addGenre).toThrow('Genre cannot be empty.');
        });

        // biography
        test('given: empty biography, when: artist is created, then: an error is thrown', () => {
            // given

            // when
            const createArtist = () => new Artist({
                artistName: 'Jeremy Zucker',
                password: 'jeremy123',
                genres: ['alt z', 'indie', 'alt rock', 'emo', 'blues'],
                biography: '',
                bookingFee: 1000,
                socialMedia: ['https://www.jeremyzuckermusic.com', 'https://www.instagram.com/jeremyzucker/'],
                email: 'jeremyzucker@showtime.com',
                isVerified: 'Verified',
                role: 'artist'
            });

            expect(createArtist).toThrow('Biography cannot be empty.');
        });

        test('given: negative booking fee, when: artist is created, then: an error is thrown', () => {
            // given

            // when
            const createArtist = () => new Artist({
                artistName: 'Jeremy Zucker',
                password: 'jeremy123',
                genres: ['alt z', 'indie', 'alt rock', 'emo', 'blues'],
                biography: `Jeremy Zucker is an American singer-songwriter and producer known for his introspective, melancholic style blending pop, indie, and electronic music. Born in Franklin Lakes, New Jersey, in 1996, Zucker began making music in high school, experimenting with beats and lyrics in his bedroom studio. He gained recognition with his 2015 single "Bout It" and later achieved mainstream success with "Comethru" in 2018, a hit that resonated with fans worldwide for its candid reflection on loneliness and self-discovery. Zucker’s music often delves into themes of love, mental health, and personal growth, making him a relatable voice for many listeners. His sound, characterized by soft vocals layered over airy, acoustic beats, has led to collaborations with artists like Chelsea Cutler, blackbear, and Lauv. Jeremy’s debut album, Love Is Not Dying (2020), cemented his reputation as an artist unafraid to explore vulnerability through music.`,
                bookingFee: -1000,
                socialMedia: ['https://www.jeremyzuckermusic.com', 'https://www.instagram.com/jeremyzucker/'],
                email: 'jeremyzucker@showtime.com',
                isVerified: 'Verified',
                role: 'artist'
            });

            // then
            expect(createArtist).toThrow('Booking fee must be a positive number.');
        });

        // social media
        test('given: empty social media array, when: artist is created, then: an error is thrown', () => {
            // given

            // when
            const createArtist = () => new Artist({
                artistName: 'Jeremy Zucker',
                password: 'jeremy123',
                genres: ['alt z', 'indie', 'alt rock', 'emo', 'blues'],
                biography: `Jeremy Zucker is an American singer-songwriter and producer known for his introspective, melancholic style blending pop, indie, and electronic music. Born in Franklin Lakes, New Jersey, in 1996, Zucker began making music in high school, experimenting with beats and lyrics in his bedroom studio. He gained recognition with his 2015 single "Bout It" and later achieved mainstream success with "Comethru" in 2018, a hit that resonated with fans worldwide for its candid reflection on loneliness and self-discovery. Zucker’s music often delves into themes of love, mental health, and personal growth, making him a relatable voice for many listeners. His sound, characterized by soft vocals layered over airy, acoustic beats, has led to collaborations with artists like Chelsea Cutler, blackbear, and Lauv. Jeremy’s debut album, Love Is Not Dying (2020), cemented his reputation as an artist unafraid to explore vulnerability through music.`,
                bookingFee: 1000,
                socialMedia: [],
                email: 'jeremyzucker@showtime.com',
                isVerified: 'Verified',
                role: 'artist'
            });
            
            // then
            expect(createArtist).toThrow('Artist must have at least one social media link.')
        });

        // social media
        test('given: empty social media array, when: artist is created, then: an error is thrown', () => {
            // given

            // when
            const createArtist = () => new Artist({
                artistName: 'Jeremy Zucker',
                password: 'jeremy123',
                genres: ['alt z', 'indie', 'alt rock', 'emo', 'blues'],
                biography: `Jeremy Zucker is an American singer-songwriter and producer known for his introspective, melancholic style blending pop, indie, and electronic music. Born in Franklin Lakes, New Jersey, in 1996, Zucker began making music in high school, experimenting with beats and lyrics in his bedroom studio. He gained recognition with his 2015 single "Bout It" and later achieved mainstream success with "Comethru" in 2018, a hit that resonated with fans worldwide for its candid reflection on loneliness and self-discovery. Zucker’s music often delves into themes of love, mental health, and personal growth, making him a relatable voice for many listeners. His sound, characterized by soft vocals layered over airy, acoustic beats, has led to collaborations with artists like Chelsea Cutler, blackbear, and Lauv. Jeremy’s debut album, Love Is Not Dying (2020), cemented his reputation as an artist unafraid to explore vulnerability through music.`,
                bookingFee: 1000,
                socialMedia: ['@jeremyzucker'],
                email: 'jeremyzucker@showtime.com',
                isVerified: 'Verified',
                role: 'artist'
            });
            
            // then
            expect(createArtist).toThrow("Social media links must be valid URLs (starting with 'http').")
        });

        // social media
        test('given: empty social media array, when: artist is created, then: an error is thrown', () => {
            // given

            // when
            const addSocialMedia = () => {
                artist.setSocialMedia('');
            }
                
            // then
            expect(addSocialMedia).toThrow("Social media links must be valid URLs (starting with 'http').")
        });
    
    // user
        // email
        test("given invalid email, when creating a user, then an error is thrown", () => {
            // given

            // when
            const createUser = () => new User({
                email: "invalid-email",
                password: "password123",
                firstName: "John",
                lastName: "Doe",
                username: 'johndoe',
                phoneNumber: "+1234567890",
                accountStatus: true,
                role: 'user'
            });

            // then
            expect(createUser).toThrow("Invalid email format.");
        });

        // password
        test("given password less than 8 characters, when creating a user, then an error is thrown", () => {
            // given

            // when
            const createUser = () => new User({
                email: "user@example.com",
                password: "short",
                firstName: "John",
                lastName: "Doe",
                username: 'johndoe',
                phoneNumber: "+1234567890",
                accountStatus: true,
                role: 'user'
            });

            // then
            expect(createUser).toThrow("Password must be at least 8 characters long.");
        });

        // first name
        test("given empty first name, when creating a user, then an error is thrown", () => {
            // given
            
            // when
            const createUser = () => new User({
                email: "user@example.com",
                password: "password123",
                firstName: "",
                lastName: "Doe",
                username: 'johndoe',
                phoneNumber: "+1234567890",
                accountStatus: true,
                role: 'user'
            });

            // then
            expect(createUser).toThrow("First name cannot be empty and must contain only alphabetic characters.");
        });

        // first name
        test("given non-alphabetic characters in first name, when creating a user, then an error is thrown", () => {
            // given
            
            // when
            const createUser = () => new User({
                email: "user@example.com",
                password: "password123",
                firstName: "J0hn",
                lastName: "Doe",
                username: 'johndoe',
                phoneNumber: "+1234567890",
                accountStatus: true,
                role: 'user'
            });

            // then
            expect(createUser).toThrow("First name cannot be empty and must contain only alphabetic characters.");
        });

        // last name
        test("given empty last name, when creating a user, then an error is thrown", () => {
            // given

            // when
            const createUser = () => new User({
                email: "user@example.com",
                password: "password123",
                firstName: "John",
                lastName: "",
                username: 'johndoe',
                phoneNumber: "+1234567890",
                accountStatus: true,
                role: 'user'
            });

            expect(createUser).toThrow("Last name cannot be empty and must contain only alphabetic characters.");
        });
    
        // last name
        test("given non-alphabetic characters in last name, when creating a user, then an error is thrown", () => {
            // given
            
            // when
            const createUser = ()=> new User({
                email: "user@example.com",
                password: "password123",
                firstName: "John",
                lastName: "Doe123",
                username: 'johndoe',
                phoneNumber: "+1234567890",
                accountStatus: true,
                role: 'user'
            });

            // then
            expect(createUser).toThrow("Last name cannot be empty and must contain only alphabetic characters.");
        });

        // phone number
        test("given invalid phone number format, when creating a user, then an error is thrown", () => {
            // given
            
            // when
            const createUser = () => new User({
                email: "user@example.com",
                password: "password123",
                firstName: "John",
                lastName: "Doe",
                username: 'johndoe',
                phoneNumber: "123-456",
                accountStatus: true,
                role: 'user'
            });

            // then
            expect(createUser).toThrow("Invalid phone number format.");
        });

        // account status
        test("given non-boolean account status, when creating a user, then an error is thrown", () => {
            // given

            // when
            const createUser = () => new User({
                email: "user@example.com",
                password: "password123",
                firstName: "John",
                lastName: "Doe",
                username: 'johndoe',
                phoneNumber: "+1234567890",
                accountStatus: 'true' as unknown as boolean,
                role: 'user',
            });

            // then
            expect(createUser).toThrow("Account status must be a boolean.");
        });

    // ticket
        // type
        test("given invalid ticket type, when creating a ticket, then an error is thrown", () => {
            // given

            // when
            const createTicket = () => new Ticket({
                type: 'Economy',
                status: 'Available',
                price: 25,
                eventId: event.getId() || 0,
                userId: null
            });

            // then
            expect(createTicket).toThrow("Invalid ticket type. Allowed types are: VIP, Regular, Student");
        });

        // status
        test("given invalid ticket status, when creating a ticket, then an error is thrown", () => {
            // given

            // when
            const createTicket = () => new Ticket({
                type: 'Regular',
                status: 'Reserved',
                price: 25,
                eventId: event.getId() || 0,
                userId: null
            });

            // then
            expect(createTicket).toThrow("Invalid ticket status. Allowed statuses are: Available, Sold");
        });

        // price
        test("given negative price, when creating a ticket, then an error is thrown", () => {
            // given

            // when
            const createTicket = () => new Ticket({
                type: 'Regular',
                status: 'Available',
                price: -10,
                eventId: event.getId() || 0,
                userId: null
            });

            // then
            expect(createTicket).toThrow("Price must be a positive number.");
        });

    // concert hall
        // location
        test('given empty location, when creating a concert hall, then an error is thrown', () => {
            // given

            // when
            const createConcertHall = () => new ConcertHall({
                location: '',
                capacity: 5000,
                name: 'concertHall',
                facilities: ['restroom', 'bar'],
                contactInfo: ['http://www.instagram.com/concertHall', 'concertHall@concertHall.com', '0481234567'],
                isVerified: 'Verified',
                username: 'concertHall',
                password: 'cocnertHall123',
                role: 'concertHall'
            });

            // then
            expect(createConcertHall).toThrow("Location cannot be empty.");
        });

        // capacity
        test('given negative value for capacity, when creating concert hall, then an error is thrown', () => {
            // given

            // when
            const createConcertHall = () => new ConcertHall({
                location: 'street',
                capacity: -5000,
                name: 'concertHall',
                facilities: ['restroom', 'bar'],
                contactInfo: ['http://www.instagram.com/concertHall', 'concertHall@concertHall.com', '0481234567'],
                isVerified: 'Verified',
                username: 'concertHall',
                password: 'cocnertHall123',
                role: 'concertHall'
            });

            // then
            expect(createConcertHall).toThrow("Capacity must be a positive number.");
        });

        // capacity
        test('given an unrealistically large value for capacity, when creating concert hall, then an error should be thrown', () => {
            const createConcertHall = () => new ConcertHall({
                location: 'street',
                capacity: 150000,
                name: 'concertHall',
                facilities: ['restroom', 'bar'],
                contactInfo: ['http://www.instagram.com/concertHall', 'concertHall@concertHall.com', '0481234567'],
                isVerified: 'Verified',
                username: 'concertHall',
                password: 'cocnertHall123',
                role: 'concertHall'
            });

            // then
            expect(createConcertHall).toThrow("Capacity seems unrealistically large.");
        });

        // name
        test('given an empty name, when creating concert hall, then an error should be thrown', () => {
            // given

            // when
            const createConcertHall = () => new ConcertHall({
                location: 'street',
                capacity: 5000,
                name: '',
                facilities: ['restroom', 'bar'],
                contactInfo: ['http://www.instagram.com/concertHall', 'concertHall@concertHall.com', '0481234567'],
                isVerified: 'Verified',
                username: 'concertHall',
                password: 'cocnertHall123',
                role: 'concertHall'
            });

            // then
            expect(createConcertHall).toThrow("Name cannot be empty.");
        });

        // name
        test('given a name that is too long, when creating concert hall, then an error is thrown', () => {
            // given
            const longName = 'A'.repeat(101);

            // when
            const createConcertHall = () => new ConcertHall({
                location: 'street',
                capacity: 5000,
                name: longName,
                facilities: ['restroom', 'bar'],
                contactInfo: ['http://www.instagram.com/concertHall', 'concertHall@concertHall.com', '0481234567'],
                isVerified: 'Verified',
                username: 'concertHall',
                password: 'cocnertHall123',
                role: 'concertHall'
            });

            // then
            expect(createConcertHall).toThrow("Name is too long. It should be under 100 characters.");
        });
        
        // facilities
        test('given empty facility, when creating concert hall, then an error is thrown', () => {
            // given

            // when
            const createConcertHall = () => new ConcertHall({
                location: 'street',
                capacity: 5000,
                name: 'concertHall',
                facilities: ['restroom', ''],
                contactInfo: ['http://www.instagram.com/concertHall', 'concertHall@concertHall.com', '0481234567'],
                isVerified: 'Verified',
                username: 'concertHall',
                password: 'cocnertHall123',
                role: 'concertHall'
            });

            // then
            expect(createConcertHall).toThrow("Facility at index 1 cannot be empty.");
        });