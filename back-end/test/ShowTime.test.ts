import { addDays } from 'date-fns';
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

const artist = new Artist({
    artistName: 'Jeremy Zucker',
    genres: ['alt z', 'indie', 'alt rock', 'emo', 'blues'],
    biography: `Jeremy Zucker is an American singer-songwriter and producer known for his introspective, melancholic style blending pop, indie, and electronic music. Born in Franklin Lakes, New Jersey, in 1996, Zucker began making music in high school, experimenting with beats and lyrics in his bedroom studio. He gained recognition with his 2015 single "Bout It" and later achieved mainstream success with "Comethru" in 2018, a hit that resonated with fans worldwide for its candid reflection on loneliness and self-discovery. Zucker’s music often delves into themes of love, mental health, and personal growth, making him a relatable voice for many listeners. His sound, characterized by soft vocals layered over airy, acoustic beats, has led to collaborations with artists like Chelsea Cutler, blackbear, and Lauv. Jeremy’s debut album, Love Is Not Dying (2020), cemented his reputation as an artist unafraid to explore vulnerability through music.`,
    bookingFee: 1000,
    socialMedia: ['https://www.jeremyzuckermusic.com', 'https://www.instagram.com/jeremyzucker/'],
});

// happy cases

    // event
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

    // artist
    test('given: valid values for artist, when: artist is created, then: artist is created with those values', () => {
        // given

        // when
        const newArtist = new Artist({
            artistName: 'Jeremy Zucker',
            genres: ['alt z', 'indie', 'alt rock', 'emo', 'blues'],
            biography: `Jeremy Zucker is an American singer-songwriter and producer known for his introspective, melancholic style blending pop, indie, and electronic music. Born in Franklin Lakes, New Jersey, in 1996, Zucker began making music in high school, experimenting with beats and lyrics in his bedroom studio. He gained recognition with his 2015 single "Bout It" and later achieved mainstream success with "Comethru" in 2018, a hit that resonated with fans worldwide for its candid reflection on loneliness and self-discovery. Zucker’s music often delves into themes of love, mental health, and personal growth, making him a relatable voice for many listeners. His sound, characterized by soft vocals layered over airy, acoustic beats, has led to collaborations with artists like Chelsea Cutler, blackbear, and Lauv. Jeremy’s debut album, Love Is Not Dying (2020), cemented his reputation as an artist unafraid to explore vulnerability through music.`,
            bookingFee: 1000,
            socialMedia: ['https://www.jeremyzuckermusic.com', 'https://www.instagram.com/jeremyzucker/'],
        });

        // then
        expect(newArtist.getArtistName()).toEqual('Jeremy Zucker');
        expect(newArtist.getGenres()).toEqual(['alt z', 'indie', 'alt rock', 'emo', 'blues']);
        expect(newArtist.getBiography()).toEqual(`Jeremy Zucker is an American singer-songwriter and producer known for his introspective, melancholic style blending pop, indie, and electronic music. Born in Franklin Lakes, New Jersey, in 1996, Zucker began making music in high school, experimenting with beats and lyrics in his bedroom studio. He gained recognition with his 2015 single "Bout It" and later achieved mainstream success with "Comethru" in 2018, a hit that resonated with fans worldwide for its candid reflection on loneliness and self-discovery. Zucker’s music often delves into themes of love, mental health, and personal growth, making him a relatable voice for many listeners. His sound, characterized by soft vocals layered over airy, acoustic beats, has led to collaborations with artists like Chelsea Cutler, blackbear, and Lauv. Jeremy’s debut album, Love Is Not Dying (2020), cemented his reputation as an artist unafraid to explore vulnerability through music.`);
        expect(newArtist.getBookingFee()).toEqual(1000);
        expect(newArtist.getSocialMedia()).toEqual(['https://www.jeremyzuckermusic.com', 'https://www.instagram.com/jeremyzucker/']);
    });

// unhappy cases

    // event
        // genre
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

        // time
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

        // time
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

        // time
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

        // time
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

        // date
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

        // duration
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

        // duration
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

        // description
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

        // status
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
                genres: ['alt z', 'indie', 'alt rock', 'emo', 'blues'],
                biography: `Jeremy Zucker is an American singer-songwriter and producer known for his introspective, melancholic style blending pop, indie, and electronic music. Born in Franklin Lakes, New Jersey, in 1996, Zucker began making music in high school, experimenting with beats and lyrics in his bedroom studio. He gained recognition with his 2015 single "Bout It" and later achieved mainstream success with "Comethru" in 2018, a hit that resonated with fans worldwide for its candid reflection on loneliness and self-discovery. Zucker’s music often delves into themes of love, mental health, and personal growth, making him a relatable voice for many listeners. His sound, characterized by soft vocals layered over airy, acoustic beats, has led to collaborations with artists like Chelsea Cutler, blackbear, and Lauv. Jeremy’s debut album, Love Is Not Dying (2020), cemented his reputation as an artist unafraid to explore vulnerability through music.`,
                bookingFee: 1000,
                socialMedia: ['https://www.jeremyzuckermusic.com', 'https://www.instagram.com/jeremyzucker/'],
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
                genres: [],
                biography: `Jeremy Zucker is an American singer-songwriter and producer known for his introspective, melancholic style blending pop, indie, and electronic music. Born in Franklin Lakes, New Jersey, in 1996, Zucker began making music in high school, experimenting with beats and lyrics in his bedroom studio. He gained recognition with his 2015 single "Bout It" and later achieved mainstream success with "Comethru" in 2018, a hit that resonated with fans worldwide for its candid reflection on loneliness and self-discovery. Zucker’s music often delves into themes of love, mental health, and personal growth, making him a relatable voice for many listeners. His sound, characterized by soft vocals layered over airy, acoustic beats, has led to collaborations with artists like Chelsea Cutler, blackbear, and Lauv. Jeremy’s debut album, Love Is Not Dying (2020), cemented his reputation as an artist unafraid to explore vulnerability through music.`,
                bookingFee: 1000,
                socialMedia: ['https://www.jeremyzuckermusic.com', 'https://www.instagram.com/jeremyzucker/'],
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
                genres: ['alt z', 'indie', 'alt rock', 'emo', 'blues'],
                biography: '',
                bookingFee: 1000,
                socialMedia: ['https://www.jeremyzuckermusic.com', 'https://www.instagram.com/jeremyzucker/'],
            });

            expect(createArtist).toThrow('Biography cannot be empty.');
        });

        test('given: negative booking fee, when: artist is created, then: an error is thrown', () => {
            // given

            // when
            const createArtist = () => new Artist({
                artistName: 'Jeremy Zucker',
                genres: ['alt z', 'indie', 'alt rock', 'emo', 'blues'],
                biography: `Jeremy Zucker is an American singer-songwriter and producer known for his introspective, melancholic style blending pop, indie, and electronic music. Born in Franklin Lakes, New Jersey, in 1996, Zucker began making music in high school, experimenting with beats and lyrics in his bedroom studio. He gained recognition with his 2015 single "Bout It" and later achieved mainstream success with "Comethru" in 2018, a hit that resonated with fans worldwide for its candid reflection on loneliness and self-discovery. Zucker’s music often delves into themes of love, mental health, and personal growth, making him a relatable voice for many listeners. His sound, characterized by soft vocals layered over airy, acoustic beats, has led to collaborations with artists like Chelsea Cutler, blackbear, and Lauv. Jeremy’s debut album, Love Is Not Dying (2020), cemented his reputation as an artist unafraid to explore vulnerability through music.`,
                bookingFee: -1000,
                socialMedia: ['https://www.jeremyzuckermusic.com', 'https://www.instagram.com/jeremyzucker/'],
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
                genres: ['alt z', 'indie', 'alt rock', 'emo', 'blues'],
                biography: `Jeremy Zucker is an American singer-songwriter and producer known for his introspective, melancholic style blending pop, indie, and electronic music. Born in Franklin Lakes, New Jersey, in 1996, Zucker began making music in high school, experimenting with beats and lyrics in his bedroom studio. He gained recognition with his 2015 single "Bout It" and later achieved mainstream success with "Comethru" in 2018, a hit that resonated with fans worldwide for its candid reflection on loneliness and self-discovery. Zucker’s music often delves into themes of love, mental health, and personal growth, making him a relatable voice for many listeners. His sound, characterized by soft vocals layered over airy, acoustic beats, has led to collaborations with artists like Chelsea Cutler, blackbear, and Lauv. Jeremy’s debut album, Love Is Not Dying (2020), cemented his reputation as an artist unafraid to explore vulnerability through music.`,
                bookingFee: 1000,
                socialMedia: [],
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
                genres: ['alt z', 'indie', 'alt rock', 'emo', 'blues'],
                biography: `Jeremy Zucker is an American singer-songwriter and producer known for his introspective, melancholic style blending pop, indie, and electronic music. Born in Franklin Lakes, New Jersey, in 1996, Zucker began making music in high school, experimenting with beats and lyrics in his bedroom studio. He gained recognition with his 2015 single "Bout It" and later achieved mainstream success with "Comethru" in 2018, a hit that resonated with fans worldwide for its candid reflection on loneliness and self-discovery. Zucker’s music often delves into themes of love, mental health, and personal growth, making him a relatable voice for many listeners. His sound, characterized by soft vocals layered over airy, acoustic beats, has led to collaborations with artists like Chelsea Cutler, blackbear, and Lauv. Jeremy’s debut album, Love Is Not Dying (2020), cemented his reputation as an artist unafraid to explore vulnerability through music.`,
                bookingFee: 1000,
                socialMedia: ['@jeremyzucker'],
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