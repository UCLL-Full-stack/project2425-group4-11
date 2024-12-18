import { Artist } from "../model/Artist";
import artistDb from "../repository/artist.db";
import { ArtistInput, AuthenticationResponse, Role } from "../types";
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../util/jwt";
import { UnauthorizedError } from "express-jwt";

const getAllArtists = async (): Promise<Artist[]> => artistDb.getAllArtists();

const getArtists = async ({
    role,
}: {
    role: Role;
}): Promise<Artist[]> => {
    if (role === 'admin') {
        return artistDb.getAllArtists();
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }
};

const getArtistByArtistName = async ({ artistName }: { artistName: string }): Promise<Artist> => {
    const artist = await artistDb.getArtistByArtistName({ artistName});
    if (!artist) {
        throw new Error(`Artist with artist name: ${artistName} does not exist.`);
    }
    return artist;
}

const authenticate = async ({ artistName, password }: ArtistInput): Promise<AuthenticationResponse> => {
    const artist = await getArtistByArtistName({ artistName });

    const isValidPassword = await bcrypt.compareSync(password, artist.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ username: artistName, role: artist.getRole() }),
        username: artistName,
        fullname: artist.getArtistName(),
        role: artist.getRole(),
    };
};

const createArtist = async ({
    artistName,
    password,
    genres,
    biography,
    bookingFee,
    socialMedia,
    email,
}: ArtistInput): Promise<Artist> => {
    const existingArtist = await artistDb.getArtistByArtistName({ artistName });
    if (existingArtist) {
        throw new Error(`${artistName} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const artist = new Artist({ artistName, password: hashedPassword, genres, biography, bookingFee, socialMedia, email, role: 'artist', isVerified: 'Pending' });
    return await artistDb.createArtist(artist);
}

const updateArtist = async (username: string, role: Role): Promise<Artist> => {
    const artist = await artistDb.getArtistByArtistName({ artistName: username });
    if (!artist) {
        throw new Error(`Artist with username ${username} does not exist.`);
    }

    if (role !== 'admin') {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    };

    const artistId = artist.getId();
    if (artistId === undefined) {
        throw new Error('Artist ID is missing. Cannot update artist.');
    }

    const updatedArtist: Partial<ArtistInput> = {
        email: artist.getEmail(),
        artistName: username,
        genres: artist.getGenres(),
        biography: artist.getBiography(),
        bookingFee: artist.getBookingFee(),
        socialMedia: artist.getSocialMedia(),
        isVerified: "Verified",
    }
    return await artistDb.updateArtist(artistId, updatedArtist);
}

export default {
    getAllArtists,
    createArtist,
    authenticate,
    updateArtist,
    getArtists,
    getArtistByArtistName
}