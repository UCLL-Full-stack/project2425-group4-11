import eventDB from '../repository/event.db';
import { Event } from '../model/Event';


const getAllEvents = async (): Promise<Event[]> => eventDB.getAllEvents();

const getEventById = async (id: number): Promise<Event> => {
    const event = await eventDB.getEventById({ id });
    if (!event) throw new Error(`Event with id ${id} does not exist.`);
    return event;
};

export default { getAllEvents, getEventById };