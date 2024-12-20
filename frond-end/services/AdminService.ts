const updateArtistStatus = async (id: string, status: string) => {
       return fetch(process.env.NEXT_PUBLIC_API_URL + `/artists/${id}/isVerified`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
};

const getAllArtists = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/artists", {
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
    getAllConcertHals,
    updateArtistStatus
};

export default AdminService;
