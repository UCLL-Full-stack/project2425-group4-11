import eventDB from '../repository/event.db';
import { Event } from '../model/Event';


const getAllEvents=(): Event[] => eventDB.getAllEvents();

const getEventById = (id: number): Event => {
    const event = eventDB.getEventById({ id });
    if (!event) throw new Error(`Event with id ${id} does not exist.`);
    return event;
};

export default { getAllEvents, getEventById };