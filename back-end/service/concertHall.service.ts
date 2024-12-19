import concertHallDB from '../repository/concertHall.db';
import { ConcertHall } from '../model/ConcertHall';
import { AuthenticationResponse, ConcertHallInput, Role } from '../types';
import { UnauthorizedError } from 'express-jwt';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';

// const getAllConcertHalls = (): ConcertHall[] => concertHallDB.getAllConcertHalls();

// const getConcertHallById = (id: number): ConcertHall => {
//     const concertHall = concertHallDB.getConcertHallById({ id });
//     if (!concertHall) throw new Error(`Concert hall with id ${id} does not exist.`);
//     return concertHall;
// };

// const getConcertHallByName = async ({ name }: { name: string }): Promise<ConcertHall> => {
//     const concertHall = await concertHallDB.getConcertHallByName({ name });
//     if (!concertHall) {
//         throw new Error(`Concert hall with name: ${name} does not exist.`);
//     }
//     return concertHall;
// };

const getConcertHallByUsername = async ({ username }: { username: string }): Promise<ConcertHall> => {
    const concertHall = await concertHallDB.getConcertHallByUsername({ username });
    if (!concertHall) {
        throw new Error(`Concert hall with username: ${username} does not exist.`);
    }
    return concertHall;
}

const authenticate = async ({ username, password }: ConcertHallInput): Promise<AuthenticationResponse> => {
    const concertHall = await getConcertHallByUsername({ username });

    const isValidPassword = await bcrypt.compareSync(password, concertHall.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ username: username, role: concertHall.getRole() }),
        username: username,
        fullname: concertHall.getName(),
        role: concertHall.getRole(),
    };
};

const createConcertHall = async ({
    location,
    capacity,
    name,
    facilities,
    contactInfo,
    username,
    password
}: ConcertHallInput): Promise<ConcertHall> => {
    const existingConcertHall = await concertHallDB.getConcertHallByUsername({ username });

    if (existingConcertHall) {
        throw new Error(`Concert hall with name ${name} is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const concertHall = new ConcertHall({ location, capacity, name, facilities, contactInfo, isVerified: 'Pending', username, password: hashedPassword, role: 'concertHall' });

    return await concertHallDB.createConcertHall(concertHall);
};

const getConcertHallById = async (id: number): Promise<ConcertHall> => {
    const concertHall = await concertHallDB.getConcertHallById({ id });
    if (!concertHall) {
        throw new Error(`Concert hall with id ${id} does not exist.`);
    }
    return concertHall;
}

// const getConcertHalls = async ({
//     role,
// }: {
//     role: Role;
// }): Promise<ConcertHall[]> => {
//     if (role === 'admin') {
//         return concertHallDB.getAllConcertHalls();
//     } else {
//         throw new UnauthorizedError('credentials_required', {
//             message: 'You are not authorized to access this resource.',
//         });
//     }
// };

export default {
    createConcertHall,
    authenticate,
    getConcertHallByUsername,
    getConcertHallById,
};