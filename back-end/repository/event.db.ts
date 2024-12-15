import { Event } from "../model/Event";
import database from "./database";


const now = new Date();
const date = new Date();

date.setMonth(now.getMonth() + 1)

const events = [
    new Event({
        id: 1,
        title:'ACDC- rocking hard',
        genre: 'Rock',
        time: '20:00',
        date: date,
        duration: 60,
        description: 'a new band who are performing live for the first time',
        status: 'Past',
        }),
    new Event({
        id: 2,
        title: 'Taylor Swift - Erras tours',
        genre: 'Pop',
        time: '20:00',            
        date: date,
        duration: 120,
        description: 'Taylor swift errors tour comes to visit',
        status: 'Upcoming',
        })
];

const getAllEvents = (): Event[] => {
    return events;
}

const getEventById = ({ id }: { id: number}): Event | null => {
    return events.find((event) => event.getId() === id) || null;
}

// const getEventByTitle = async ({ title }: { title: string }): Promise<Event | null> => {
//     try {
//         const userPrisma = await database.event.findFirst({
//             where: { title },
//         });

//         return userPrisma ? Event.from(eventPrisma) : null;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// };

export default { getAllEvents, getEventById }