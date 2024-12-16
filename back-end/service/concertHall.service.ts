import concertHallDB from '../repository/concertHall.db';
import { ConcertHall } from '../model/ConcertHall';
import { ConcertHallInput } from '../types';

const getAllConcertHalls = (): ConcertHall[] => concertHallDB.getAllConcertHalls();

const getConcertHallById = (id: number): ConcertHall => {
    const concertHall = concertHallDB.getConcertHallById({ id });
    if (!concertHall) throw new Error(`Concert hall with id ${id} does not exist.`);
    return concertHall;
};

const getConcertHallByName = async ({ name }: { name: string }): Promise<ConcertHall> => {
    const concertHall = await concertHallDB.getConcertHallByName({ name });
    if (!concertHall) {
        throw new Error(`Concert hall with name: ${name} does not exist.`);
    }
    return concertHall;
};

const createConcertHall = async ({
    location,
    capacity,
    name,
    facilities,
    contactInfo,
}: ConcertHallInput): Promise<ConcertHall> => {
    const existingConcertHall = await concertHallDB.getConcertHallByName({ name });

    if (existingConcertHall) {
        throw new Error(`Concert hall with name ${name} is already registered.`);
    }

    const concertHall = new ConcertHall({ location, capacity, name, facilities, contactInfo });

    return await concertHallDB.createConcertHall(concertHall);
};

export default {
    getAllConcertHalls,
    getConcertHallById,
    createConcertHall,
    getConcertHallByName,
};