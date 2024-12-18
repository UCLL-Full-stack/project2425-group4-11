import eventDB from '../repository/event.db';
import { Event } from '../model/Event';
import { EventInput } from '../types';

const getAllEvents = async (): Promise<Event[]> => eventDB.getAllEvents();

const getEventById = async (id: number): Promise<Event> => {
    const event = await eventDB.getEventById({ id });
    if (!event) throw new Error(`Event with id ${id} does not exist.`);
    return event;
};

const createEvent = async ({
    title,
    genre,
    time,
    date,
    duration,
    description,
    status,
    artistId,
    concertHallId,
}: EventInput): Promise<Event> => {
    const existingEvent = await eventDB.getEventByTitle({ title });

    if (existingEvent) {
        throw new Error(`Event with name ${title} already exists.`);
    }

    const event = new Event({title, genre, time, date, duration, description, status, artistId, concertHallId});

    return await eventDB.createEvent(event);
}

const deleteEvent = async (id: number): Promise<void> => {
    const event = await eventDB.getEventById({ id });
    if (!event) {
        throw new Error(`Event with id ${id} does not exist.`);
    }
    await eventDB.deleteEvent({ id });
}

const updateEventSchedule = async (id: number, { date, time }: { date: string; time: string }): Promise<void> => {
    const event = await eventDB.getEventById({ id });
    if (!event) {
      throw new Error(`Event with id ${id} does not exist.`);
    }
  
    await eventDB.updateEvent({ id, date, time });
  };

const getEventsByArtistId = async (artistId: number): Promise<Event[]> => {
    return await eventDB.getEventsByArtistId({ artistId });
}

const getEventsByConcertHallId = async (concertHallId: number): Promise<Event[]> => {
    return await eventDB.getEventsByConcertHallId({ concertHallId });
}

export default { getAllEvents, getEventById, createEvent, deleteEvent, updateEventSchedule, getEventsByArtistId, getEventsByConcertHallId };