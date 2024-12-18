const updateArtistVerified = async (artistId: string, verified: string) => {

}

const updateConcerHallVerified = async (concertHallId: string, verified: string) => {

}

const getAllArtists = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/artists/role", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
}

const getAllConcertHals = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/concerthall/role", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
}

const AdminService = {
    getAllArtists,
    getAllConcertHals
};

export default AdminService;
