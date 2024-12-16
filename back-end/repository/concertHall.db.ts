import { ConcertHall } from "../model/ConcertHall";
import database from "./database";

const concertHalls = [
    new ConcertHall({
        id: 1,
        location: "London",
        capacity: 5000,
        name: "Royal Albert Hall",
        facilities: ["Parking", "Restrooms", "VIP Lounge"],
        contactInfo: {
            email: "contact@royalalberthall.com",
            countryCode: "+44",
            number: "2075898212",
            instagram: "royalalberthall"
        }
    }),
];

const getAllConcertHalls = (): ConcertHall[] => {
    return concertHalls;
};

const getConcertHallById = ({ id }: { id: number }): ConcertHall | null => {
    return concertHalls.find((concertHall) => concertHall.getId() === id) || null;
};

const getConcertHallByName = ({ name }: { name: string }): ConcertHall | null => {
    return concertHalls.find((concertHall) => concertHall.getName() === name) || null;
};

const createConcertHall = async (concertHall: ConcertHall): Promise<ConcertHall> => {
    try {
        const concertHallPrisma = await database.concertHall.create({
            data: {
                location: concertHall.getLocation(),
                capacity: concertHall.getCapacity(),
                name: concertHall.getName(),
                facilities: concertHall.getFacilities(),
                contactInfo: {
                    create: concertHall.getContactInfo(),
                },
            },
        });
        return ConcertHall.from({
            ...concertHallPrisma,
            contactInfo: concertHall.getContactInfo(),
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllConcertHalls,
    getConcertHallById,
    getConcertHallByName,
    createConcertHall,
};