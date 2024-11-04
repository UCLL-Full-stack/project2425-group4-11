import { Artist } from "../model/Artist";
import artistDb from "../repository/artist.db";

const getAllArtists = (): Artist[] => artistDb.getAllArtists();

export default {
    getAllArtists,
}