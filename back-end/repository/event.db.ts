import { Event } from "../model/Event";
import database from "./database";

const getAllEvents = async (): Promise<Event[]> => {
    try {
        const eventsPrisma = await database.event.findMany();
        return eventsPrisma.map((eventPrisma) => Event.from(eventPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getEventById = async ({ id }: { id: number}): Promise<Event | null> => {
    try {
        const eventPrisma = await database.event.findUnique({
            where: { id },
        });

        return eventPrisma ? Event.from(eventPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getEventByTitle = async ({ title }: { title: string }): Promise<Event | null> => {
    try {
        const eventPrisma = await database.event.findFirst({
            where: { title },
        });

        return eventPrisma ? Event.from(eventPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createEvent = async (event: Event): Promise<Event> => {
    try {
        const eventPrisma = await database.event.create({
            data: {
                title: event.getTitle(),
                genre: event.getGenre(),
                time: event.getTime(),
                date: event.getDate(),
                duration: event.getDuration(),
                description: event.getDescription(),
                status: event.getStatus(),
            },
        });
        return Event.from(eventPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const deleteEvent = async ({ id }: { id: number }): Promise<void> => {
    try {
        await database.event.delete({
            where: { id },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
export default { getAllEvents, getEventById, getEventByTitle, createEvent, deleteEvent };