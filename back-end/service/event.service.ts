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
    status
}: EventInput): Promise<Event> => {
    const existingEvent = await eventDB.getEventByTitle({ title });

    if (existingEvent) {
        throw new Error(`Event with name ${title} already exists.`);
    }

    const event = new Event({title, genre, time, date, duration, description, status});

    return await eventDB.createEvent(event);
}

export default { getAllEvents, getEventById, createEvent };