import { Artist } from "@/types";

const loginArtist = (artist: Artist) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/artists/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(artist),
    });
};

const ArtistService = {
    loginArtist,
}

export default ArtistService