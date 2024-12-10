import { Artist } from "../model/Artist";
import artistDb from "../repository/artist.db";
import { ArtistInput, AuthenticationResponse } from "../types";
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../util/jwt";

const getAllArtists = async (): Promise<Artist[]> => artistDb.getAllArtists();

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
    role,
}: ArtistInput): Promise<Artist> => {
    const existingArtist = await artistDb.getArtistByArtistName({ artistName });
    if (existingArtist) {
        throw new Error(`${artistName} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const artist = new Artist({ artistName, password: hashedPassword, genres, biography, bookingFee, socialMedia, role });
    return await artistDb.createArtist(artist);
} 

export default {
    getAllArtists,
    createArtist,
    authenticate
}