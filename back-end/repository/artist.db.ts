import { Artist } from "../model/Artist";
import database from "./database";

const getAllArtists = async (): Promise<Artist[]> => {
    try {
        const artistsPrisma = await database.artist.findMany();
        return artistsPrisma.map((artistPrisma) => Artist.from(artistPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createArtist = async (artist: Artist): Promise<Artist> => {
    try {
        const artistPrisma = await database.artist.create({
            data: {
                artistName: artist.getArtistName(),
                password: artist.getPassword(),
                genres: artist.getGenres(),
                biography: artist.getBiography(),
                bookingFee: artist.getBookingFee(),
                socialMedia: artist.getSocialMedia(),
                role: artist.getRole(),
            },
        });

        return Artist.from(artistPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getArtistByArtistName = async ({ artistName }: { artistName: string }): Promise<Artist | null> => {
    try {
        const artistPrisma = await database.artist.findFirst({
            where: { artistName },
        });

        return artistPrisma ? Artist.from(artistPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllArtists,
    createArtist,
    getArtistByArtistName,
}