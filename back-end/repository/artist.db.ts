import { Artist } from "../model/Artist";

const artists = [
    new Artist({
        id: 1,
        artistName: 'sqmmi3',
        genres: ['indie', 'alt z', 'alt rock'],
        biography: `sqmmi3 is a upcoming artist who makes music influenced by brakence, Jeremy Zucker, EDEN, Chelsea Cutler and bhertuy`,
        bookingFee: 100,
        socialMedia: ["https://www.instagram.com/sqmmi3"],
    }),
]

const getAllArtists = (): Artist[] => {
    return artists;
}

const getArtistById = ({ id }: { id: number }): Artist | null => {
    return artists.find((artist) => artist.getId() === id) || null;
}

const createArtist = (artist: Artist): Artist => {
    artists.push(artist);
    return artist;
}

const getArtistByArtistName = ({ artistName }: { artistName: string }): Artist | null => {
    return artists.find((artist) => artist.getArtistName() === artistName) || null;
}

export default {
    getAllArtists,
    getArtistById,
    createArtist,
    getArtistByArtistName,
}