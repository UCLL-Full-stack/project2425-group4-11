import { Event } from "../model/Event";

const now = new Date();
const date = new Date();

date.setMonth(now.getMonth() + 1)

const events = [
    new Event({
        id: 1,
        genre: 'Rock',
        time: '20:00',
        date: date,
        duration: 60,
        description: 'a new band who are performing live for the first time',
        status: 'Past',
        }),
    new Event({
        id: 2,
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

export default { getAllEvents, getEventById }