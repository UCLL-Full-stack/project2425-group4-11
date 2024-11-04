import { Artist } from "../model/Artist";
import artistDb from "../repository/artist.db";

const getAllArtists = (): Artist[] => artistDb.getAllArtists();

const getArtistById = (id: number): Artist | null => {
    const artist = artistDb.getArtistById({ id });
    if(!artist) throw new Error(`Artist with id ${id} does not exist.`);
    return artist;
}

export default {
    getAllArtists,
    getArtistById,
}