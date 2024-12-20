import { ConcertHall } from "../model/ConcertHall";
import database from "./database";

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
};

const getAllConcertHalls = async (): Promise<ConcertHall[]> => {
    try {
        const concertHallsPrisma = await database.concertHall.findMany();
        return concertHallsPrisma.map((concertHallPrisma) => ConcertHall.from(concertHallPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createConcertHall,
    getConcertHallByUsername,
    getConcertHallById,
    getAllConcertHalls,
};