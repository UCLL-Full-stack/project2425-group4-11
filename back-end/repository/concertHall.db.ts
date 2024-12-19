import { ConcertHall } from "../model/ConcertHall";
import database from "./database";

// const concertHalls = [
//     new ConcertHall({
//         id: 1,
//         location: "London",
//         capacity: 5000,
//         name: "Royal Albert Hall",
//         facilities: ["Parking", "Restrooms", "VIP Lounge"],
//         contactInfo: {
//             email: "contact@royalalberthall.com",
//             countryCode: "+44",
//             number: "2075898212",
//             instagram: "royalalberthall"
//         }
//     }),
// ];

// const getAllConcertHalls = (): ConcertHall[] => {
//     return concertHalls;
// };

// const getConcertHallById = ({ id }: { id: number }): ConcertHall | null => {
//     return concertHalls.find((concertHall) => concertHall.getId() === id) || null;
// };

// const getConcertHallByName = ({ name }: { name: string }): ConcertHall | null => {
//     return concertHalls.find((concertHall) => concertHall.getName() === name) || null;
// };

const getConcertHallByUsername = async ({ username }: { username: string }): Promise<ConcertHall | null> => {
    try {
        const concertHallPrisma = await database.concertHall.findFirst({
            where: { username },
        });
        return concertHallPrisma ? ConcertHall.from(concertHallPrisma) : null
    } catch (error) {
        console.error("Error fetching concert hall by username:", error);
        throw new Error("Could not fetch concert hall.");
    }
}

const createConcertHall = async (concertHall: ConcertHall): Promise<ConcertHall> => {
    try {
        const concertHallPrisma = await database.concertHall.create({
            data: {
                location: concertHall.getLocation(),
                capacity: concertHall.getCapacity(),
                name: concertHall.getName(),
                facilities: concertHall.getFacilities(),
                contactInfo: concertHall.getContactInfo(),
                isVerified: concertHall.getIsVerified(),
                username: concertHall.getUsername(),
                password: concertHall.getPassword(),
                role: concertHall.getRole(),
            },
        });
        return ConcertHall.from(concertHallPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getConcertHallById = async ({ id }: {id: number }): Promise<ConcertHall | null> => {
    try {
        const concertHallPrisma = await database.concertHall.findFirst({
            where: { id },
        })
        return concertHallPrisma ? ConcertHall.from(concertHallPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    createConcertHall,
    getConcertHallByUsername,
    getConcertHallById
};