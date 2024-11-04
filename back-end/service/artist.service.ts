import { Artist } from "../model/Artist";
import artistDb from "../repository/artist.db";
import { ArtistInput } from "../types";

const getAllArtists = (): Artist[] => artistDb.getAllArtists();

const getArtistById = (id: number): Artist | null => {
    const artist = artistDb.getArtistById({ id });
    if(!artist) throw new Error(`Artist with id ${id} does not exist.`);
    return artist;
}

const createArtist = ({
    artistName,
    genres,
    biography,
    bookingFee,
    socialMedia,
}: ArtistInput): Artist => {
    const existingArtist = artistDb.getArtistByArtistName({ artistName });
    if (existingArtist) {
        throw new Error(`${artistName} already exists.`);
    }
    const artist = new Artist({ artistName, genres, biography, bookingFee, socialMedia });
    return artist;
} 

export default {
    getAllArtists,
    getArtistById,
    createArtist,
}